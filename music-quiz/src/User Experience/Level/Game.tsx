import React, { useState, useEffect, useRef } from 'react';


//Styles
import { GlobalStyle, Wrapper, NextButton, RecordButton, AgainButton, GameStartButton} from '../../GameContent.styles';

import AnswerButtonsTwo from '../../AnswerButtonsTwo';

import {useNavigate, useLocation} from 'react-router-dom';
import { AiFillSound } from 'react-icons/ai';
import axios from 'axios';


export type AnswerObject = {
  question: string; // This is the audio file I am willing to consider
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;
let correctAnswers: string[] = [];

const Game = () => {
   const location = useLocation();
   const difficultyFromUrl = new URLSearchParams(location.search).get('difficulty')
   //const[openLoginin, setOpenLoginIn] = useState(false);
   //const[signedIn, signIn] = useState(false);

   const[loading, setLoading] = useState(false); // My game is loaded

   /* change the type of questions into the audio files created */
   
   let questions: string[]  = [];
   for (let i = 1; i <= TOTAL_QUESTIONS; i++){
      questions.push(`../../../public/mp3 files/problem${i}.mp3`)
   }
   const[number, setNumber] = useState(0); // the question number

   const audioRef = useRef(new Audio());

   const playSound = () => {
       const currentMp3File = questions[number];
       if (audioRef.current && currentMp3File) {
           audioRef.current.src = currentMp3File;
           audioRef.current.play().catch(e => console.error('Error playing sound: ', e));
       }
   }

   const[currentAnswer, setCurrentAnswer] = useState<{
        answer: string;
        isCorrect: boolean;
        correctAnswer: string
   } | null>(null);

   const[userAnswers, setUserAnswers] = useState<string[]>([]); // the answers from the users

   const[score, setScore] = useState(0); // the score each user receives
   const[difficulty, setDifficulty] = useState('Easy');

   const[gameOver, setGameOver] = useState(true); // the game is Over


   const[timer, setTimer] = useState({
      seconds: 0,
      minutes: 0,
      hours: 0
   });

   const [timerRunning, setTimerRunning] = useState(false);

   useEffect(()=>{
    let interval: NodeJS.Timeout;
    if (timerRunning) {
      interval = setInterval(() => {
         setTimer(prevTimer => {
            let { hours, minutes, seconds } = prevTimer;
            seconds++;
            if (seconds === 60) {
               minutes++;
               seconds = 0;
            }
            if (minutes === 60) {
               hours++;
               minutes = 60;
            }
            return { hours, minutes, seconds };
         });        
      }, 1000);
    } 
    return () => clearInterval(interval);
}, [timerRunning]);

   const navigate = useNavigate();

   //console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)); 

   const startTrivial = async () => {
        // We want to make the API call(start the game) 
        // with the function called async().
        setLoading(true);
        setGameOver(false);
        // Make a POST request to send the difficulty to the backend
        await axios.post('http://127.0.0.1:8000/api/start-game/', difficultyFromUrl, {
            headers: {
              'Content-Type': 'text/plain',
            },
        })
        .then(response => {
           const questionsData = response.data.questionsData;
           for(let i = 0; i < questionsData.length; i++){
            correctAnswers[i] = questionsData['interval'];
           }
           console.log("Questions Data: ", {questionsData});
        })
        .catch(error => {
           console.error('Error: ', error);
        })
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
        setTimer({seconds: 0, minutes: 0, hours: 0});
        setTimerRunning(true);
    };


    
   const CheckAnswer = (answer_selected: string) => {
      if (userAnswers.length === 0 || questions.length === 0 || gameOver) {
           return
      }

      const correct_answer = correctAnswers[number];
      const isCorrect = correct_answer === answer_selected;
      
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }
      setCurrentAnswer({answer: answer_selected, 
                        isCorrect,
                        correctAnswer: correct_answer});
      setUserAnswers(prevUserAnswers => [...prevUserAnswers, answer_selected]);
      
   }
 
   const BackMenu = () => {
       
       navigate('/menu/gamestart');
   }

   const UserRecord = () => {
       navigate('/menu/userdata', {state:{score: score, 
                                          difficulty: difficulty,
                                          timer: `${timer.hours}h ${timer.minutes}m ${timer.seconds}s`}});
   }

   const UserMenu = () => {
        navigate('/menu');
   }

   const nextQuestion = () => {
        // concentrate on the specific instance at which the user
        // selects the next question.
        const next = number + 1;
        if (next === TOTAL_QUESTIONS){
            setGameOver(true);
        }
        else{
            setNumber(next);
        }
      
    };


      
    
    
    
    return (
     <>

      <GlobalStyle />
      <Wrapper />
          
        {gameOver && number === 0 &&
           <div style={{display: 'flex',
                        flexDirection: 'column', 
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh'}}>
              <div style={{ marginBottom: '20px' }}>
                        <h1>Music Quiz</h1>
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <GameStartButton className="start" onClick={startTrivial} >
                      Start
                  </GameStartButton>
                  <GameStartButton className="back" onClick={UserMenu}>
                      Back
                  </GameStartButton>
              </div>
           </div>
          }


          {!gameOver && number === TOTAL_QUESTIONS - 1 && userAnswers.length === number + 1 &&
            <div>
              
              <RecordButton className="statistics" onClick={UserRecord}>
                         User Record
              </RecordButton>
              
              <AgainButton className="finish" onClick={BackMenu}>
                         Play Again
              </AgainButton>
            </div>  
            
          }

          {!gameOver ? (
            <div className="setting">
              <p className="score">
                Score:{score}
              </p>
              <p className="time">
                Time: {timer.hours}h {timer.minutes}m {timer.seconds}s
              </p>
            </div>): null
          }

          {loading && (
              <p>
                Loading Questions: ...
              </p>)
            }
 
            {/* This part can be deleted based on the video */}
            {/*  */}
            {/* {!loading && !gameOver && (
               
            } */}
            {!loading && !gameOver && (
                
              <div>
                  <p> 
                     Question: {number + 1} / {TOTAL_QUESTIONS}
                  </p>
                  {/* TODO: include the audio */}
                  <AiFillSound style={{height:50, width:50}} onClick={playSound}/>
                  <AnswerButtonsTwo answers={['P1', 'm2', 'M2', 'm3', 
                                              'M3', 'P4', 'A4', 'P5', 
                                              'm6', 'M6', 'm7', 'M7',
                                              'P8']} 
                                    onAnswerClick={CheckAnswer}
                                    answerSelected={currentAnswer}
                  />
              </div>
            )}

            
            {!loading && !gameOver && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
                <NextButton className="next" onClick={nextQuestion}>
                  Next
                </NextButton>): null
            }
        
      </>
  );
}

export default Game;
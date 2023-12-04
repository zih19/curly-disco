import React, { useState, useEffect, useRef } from 'react';


//Styles
import { GlobalStyle, Wrapper, NextButton, RecordButton, AgainButton, GameStartButton} from '../../GameContent.styles';

import AnswerButtonsTwo from '../../AnswerButtonsTwo';
import { useCookies } from 'react-cookie';
import {useNavigate, useLocation} from 'react-router-dom';
import { AiFillSound } from 'react-icons/ai';
import axios from 'axios';

//Audio
import Audio1 from '../../mp3 files/problem1.mp3';
import Audio2 from '../../mp3 files/problem2.mp3';
import Audio3 from '../../mp3 files/problem3.mp3';
import Audio4 from '../../mp3 files/problem4.mp3';
import Audio5 from '../../mp3 files/problem5.mp3';
import Audio6 from '../../mp3 files/problem6.mp3';
import Audio7 from '../../mp3 files/problem7.mp3';
import Audio8 from '../../mp3 files/problem8.mp3';
import Audio9 from '../../mp3 files/problem9.mp3';
import Audio10 from '../../mp3 files/problem10.mp3';


export type AnswerObject = {
  question: string; // This is the audio file I am willing to consider
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;


const Game = () => {
  // useEffect(() => {
  //   console.log('Game component mounted');
  //   return () => {
  //     console.log('Game component unmounted');
  //   };
  // }, []);


   const location = useLocation();
   const difficultyFromUrl = new URLSearchParams(location.search).get('difficulty');
   

   const[loading, setLoading] = useState(false); // My game is loaded

   /* change the type of questions into the audio files created */
   
   const[number, setNumber] = useState(0); // the question number
  
   const questions = [Audio1, Audio2, Audio3, Audio4, Audio5, Audio6, Audio7, Audio8, Audio9, Audio10];

   const audioRef = useRef(new Audio());

   const playSound = () => {
       const currentMp3File = questions[number];
       console.log("The current mp3 file is: ", currentMp3File);
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
   const[gameOver, setGameOver] = useState(true); // the game is Over

   const[timer, setTimer] = useState({
      seconds: 0,
      minutes: 0,
      hours: 0
   });

   const[showCorrectAnswer, setShowCorrectAnswer] = useState(false);
   //let correctAnswers: string[] = [];
   const[correctAnswers, setCorrectAnswers] = useState<string[]>([]);
   //console.log("currentAnswer:", currentAnswer, "showCorrectAnswer:", showCorrectAnswer);


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
   const dataToSend = {
    difficulty: difficultyFromUrl,
  };

   const startTrivial = async (e: React.MouseEvent<HTMLElement>) => {
        //console.log("Click event:", e);
        
        if(!gameOver) {
          console.log("GAME ALREADY IN SESSIon")
          return;
        }
        // We want to make the API call(start the game) 
        // with the function called async().
        setLoading(true);
        setGameOver(false);
        
        console.log("Beginning of startTrivial");
        // Make a POST request to send the difficulty to the backend
        e.preventDefault();
        try{
          const response = await axios.post('http://127.0.0.1:8000/api/start-game/', dataToSend, {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
              responseType: 'json',
          });

          const questionsData = response.data.questionsData;
        //   let correctAnswersVerified: string[] = [];
        //  for(let i = 0; i < Object.keys(questionsData).length; i++){
        //     correctAnswersVerified[i] = questionsData[(i+1).toString()]['interval'];
        //    }
        // console.log("Correct Answers Verified: ", correctAnswersVerified)
          setCorrectAnswers(Object.keys(questionsData).map(key => questionsData[key]['interval']));
      }catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Question loading failed:', error.response ? error.response.data : error.message); //failing here
          } else {
              console.error('Question loading failed:', error);
          }
          //alert('Invalid username or password');
        }
         
       

        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
        setTimer({seconds: 0, minutes: 0, hours: 0});
        setTimerRunning(true);
    };

    
    
   const CheckAnswer = (answer_selected: string) => {
      //console.log("The current answer is: ", answer_selected);
      //console.log("Answer selected:", answer_selected, "Correct answer:", correctAnswers[number]);
      // if (userAnswers.length === 0 || questions.length === 0) {
      //      return;
      // }

      const correct_answer = correctAnswers[number];
      
      const isCorrect = correct_answer === answer_selected;
      
      setUserAnswers((prevUserAnswers) => [...prevUserAnswers, answer_selected]);
      setCurrentAnswer({
        answer: answer_selected, 
        isCorrect,
        correctAnswer: correct_answer
      });

      console.log("current Answer:", currentAnswer);


      if (isCorrect) {
        setScore((prev) => prev + 1);
      }

      setShowCorrectAnswer(true);

      if (number === TOTAL_QUESTIONS - 1) {
        // the timer is stopped
        setTimerRunning(false);
      }
    }
 
   const BackMenu = () => {
       
       navigate('/menu/gamestart');
   }

   const UserRecord = () => {
       navigate('/menu/userdata');
   }

   const UserMenu = () => {
        navigate('/menu');
   }

   const nextQuestion = () => {
        // concentrate on the specific instance at which the user
        // selects the next question..
        const next = number + 1;
        if (next === TOTAL_QUESTIONS){
            setTimerRunning(false);
            setGameOver(true);
        }
        else{
            setNumber(next);
            setShowCorrectAnswer(false);
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
                  <GameStartButton type = "button" className="start" onClick={startTrivial} data-csrf="{% csrf_token %}">
                      Start
                  </GameStartButton>
                  <GameStartButton type = "button" className="back" onClick={UserMenu}>
                      Back
                  </GameStartButton>
              </div>
           </div>
          }


          {!gameOver && number === TOTAL_QUESTIONS - 1 && userAnswers.length === TOTAL_QUESTIONS &&
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
                                    showCorrectAnswer={showCorrectAnswer}
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
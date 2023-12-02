import React, { useState, useEffect } from 'react';
//import { Difficulty, fetchQuizQuestions } from '../../Questions';
// Components
//import QuestionCard from '../../components/QuestionCard';
//Type
import {QuestionState} from '../../Questions';
//Styles
import { GlobalStyle, Wrapper, NextButton, RecordButton, AgainButton, GameStartButton} from '../../GameContent.styles';

import AnswerButtonsTwo from '../../AnswerButtonsTwo';
//import GameMode from '../GameMode'
import {useNavigate, useLocation} from 'react-router-dom';
import { AiFillSound } from 'react-icons/ai';
import axios from 'axios';


//import axios from 'axios';
export type AnswerObject = {
  question: string; // This is the audio file I am willing to consider
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const Game = () => {
   const location = useLocation();
   const difficultyFromUrl = new URLSearchParams(location.search).get('difficulty')
   //const[openLoginin, setOpenLoginIn] = useState(false);
   //const[signedIn, signIn] = useState(false);

   const[loading, setLoading] = useState(false); // My game is loaded

   /* change the type of questions into the audio files created */
   const[questions, setQuestions] = useState<QuestionState[]>([]); 

   const[number, setNumber] = useState(0); // the question number

   const[currentAnswer, setCurrentAnswer] = useState<{
        answer: string;
        isCorrect: boolean;
        correctAnswer: string
   } | null>(null);

   const[userAnswers, setUserAnswers] = useState<string[]>([]); // the answers from the users

   const[score, setScore] = useState(0); // the score each user receives
   const[difficulty, setDifficulty] = useState('Easy');

   const[gameOver, setGameOver] = useState(true); // the game is Over

   
   //const[back, setBack] = useState(true); // back to the previous question 
   const[seconds, setSecond] = useState(0); // second
   const[minutes, setMinute] = useState(0); // minute
   const[hours, setHour] = useState(0); // hour

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
        });
       
        setScore(0);
        setDifficulty("Easy");
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
    };

    // const clickAnswer = (answer_selected: string) => {
    //    setUserAnswers((prev) => [...prev, answer_selected]);
    // }

    
   const CheckAnswer = (answer_selected: string) => {
      if (userAnswers.length === 0 || questions.length === 0) {
           return
      }

      const correct_answer = questions[number].correct_answer;
      const isCorrect = correct_answer === answer_selected;
      
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }
      setCurrentAnswer({answer: answer_selected, 
                        isCorrect,
                        correctAnswer: correct_answer});
      
   }
 
   const BackMenu = () => {
       
       navigate('/menu/gamestart');
   }

   const UserRecord = () => {
       navigate('/menu/userdata', {state:{score: score, difficulty: difficulty}});
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


   
    useEffect(()=>{
      const interval = setInterval(() => {
         setSecond(prevSecond => (prevSecond + 1) % 60);
         if (seconds === 59) {
            setMinute(prevMinute => (prevMinute + 1) % 60);
         }

         if (minutes === 59) {
            setHour(prevHour => (prevHour + 1) % 60);
         }
      }, 1000);
      
      return () => clearInterval(interval);

    }, [seconds, minutes]);
    
    
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
                Time:{hours} hour(s) {minutes} minutes(s) {seconds} second(s)
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

                  {/* TODO: include the audio */}
                  <AiFillSound style={{height:50, width:50}}/>
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
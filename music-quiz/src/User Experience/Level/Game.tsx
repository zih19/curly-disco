import React, { useState, useEffect } from 'react';
//import { Difficulty, fetchQuizQuestions } from '../../Questions';
// Components
//import QuestionCard from '../../components/QuestionCard';
//Type
import {QuestionState} from '../../Questions';
//Styles
import { GlobalStyle, Wrapper, NextButton, RecordButton, AgainButton, StartButton } from '../../GameContent.styles';

import AnswerButtonsTwo from '../../AnswerButtonsTwo';
//import GameMode from '../GameMode'
import {useNavigate} from 'react-router-dom';
import { AiFillSound } from 'react-icons/ai';



//import axios from 'axios';
export type AnswerObject = {
  question: string; // This is the audio file I am willing to consider
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const Game = () => {
   
   //const[openLoginin, setOpenLoginIn] = useState(false);
   //const[signedIn, signIn] = useState(false);

   const[loading, setLoading] = useState(false); // My game is loaded

   /* change the type of questions into the audio files created */
   const[questions, setQuestions] = useState<QuestionState[]>([]); 

   const[number, setNumber] = useState(0); // the question number

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

   //console.log(questions);

   const startTrivial = async () => {
        // We want to make the API call(start the game) 
        // with the function called async().
        setLoading(true);
        //setBack(false);
        setGameOver(false);

        /* Music Interval using axios */
       
        // const newQuestions = await fetchQuizQuestions(
        //   TOTAL_QUESTIONS,
        //   Difficulty.EASY
        // );
        //setQuestions(newQuestions);


        setScore(0);
        setDifficulty("Easy");
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
    };

    
  //  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
  //       // deal with the scenario when the user triggers 
  //       // an answer for the question.
  //       if (!gameOver) {
  //         const answer_selected = e.currentTarget.value; // We call the button
  //         const correct_Answer = questions[number].correct_answer === answer_selected; // check whether the current answer 
  //                                                                                      // is equal to the correct answer
  //         if (correct_Answer){
  //             setScore(prev => prev + 1); // If the answer is correct, then the school will be added by 1.
  //         }

  //         // The user answer is more likely to be saved.
  //         const AnswerObject = {
  //              question: questions[number].question,
  //              answer: answer_selected,
  //              correct: correct_Answer,
  //              correctAnswer: questions[number].correct_answer
  //         };
  //         setUserAnswers((prev) => [...prev, AnswerObject]);
  //       }
  //  };

   const handleAnswerClick = (answer: string) => {
      setUserAnswers((prevSelectedAnswers) => [...prevSelectedAnswers, answer])
   }

   const CheckAnswer = () => {
      if (userAnswers.length === 0) {
           return
      }
      
      /* identify what your standard answer is. If both the standard answer and the correct answer are equal, the variable
         score should be increment by 1 */
      // if (userAnswers.every((answer) => answer === )) {
      //       setScore(score + 1)
      // }

      setUserAnswers([]);
   }
 
   const BackMenu = () => {
       
       navigate('/menu/gamestart');
   }

   const UserRecord = () => {
       navigate('/menu/userdata', {state:{score: score, difficulty: difficulty}});
   }
    

  //  const previousQuestion = () => {
  //      const prev = number - 1;
  //      if (prev === -1) {
  //        setBack(false);
  //      }
  //      else {
  //        setNumber(prev);
  //      }
  //  }

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
          
          <h1>Music Quiz </h1>
          
          {gameOver && number === 0 &&
            <StartButton className="start" onClick={startTrivial} >
               Start
            </StartButton>
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
                  {/* include the audio */}
                  <AiFillSound style={{height:50, width:50}}/>
                  <AnswerButtonsTwo answers={['P1', 'm2', 'M2', 'm3', 
                                              'M3', 'P4', 'A4', 'P5', 
                                              'm6', 'M6', 'm7', 'M7',
                                              'P8']} onAnswerClick={handleAnswerClick}
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
import React, { useState, useEffect } from 'react';
import { fetchQuizQuestions } from './Questions';
// Components
import QuestionCard from './components/QuestionCard';
//Type
import {QuestionState, Difficulty} from './Questions';
//Styles
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
   const[loading, setLoading] = useState(false); // My game is loaded
   const[questions, setQuestions] = useState<QuestionState[]>([]); // total question we need to take into account
   const[number, setNumber] = useState(0); // the question number
   const[userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);  // the answer from the user
   const[score, setScore] = useState(0); // the score each user receives
   const[gameOver, setGameOver] = useState(true); // the game is Over
   const[back, setBack] = useState(true); // back to the previous question 
   const[seconds, setSecond] = useState(0); // second
   const[minutes, setMinute] = useState(0); // minute
   const[hours, setHour] = useState(0); // hour

   //console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)); 

   //console.log(questions);

   const startTrivial = async () => {
        // We want to make the API call(start the game) 
        // with the function called async().
        setLoading(true);
        setGameOver(false);

        const newQuestions = await fetchQuizQuestions(
          TOTAL_QUESTIONS,
          Difficulty.EASY
        );

        setQuestions(newQuestions);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
    };
    
   const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        // deal with the scenario when the user triggers 
        // an answer for the question.
        if (!gameOver) {
          const answer_selected = e.currentTarget.value; // We call the button
          const correct_Answer = questions[number].correct_answer === answer_selected; // check whether the current answer 
                                                                                       // is equal to the correct answer
          if (correct_Answer){
              setScore(prev => prev + 1); // If the answer is correct, then the school will be added by 1.
          }
          // The user answer is more likely to be saved.
          const AnswerObject = {
               question: questions[number].question,
               answer: answer_selected,
               correct: correct_Answer,
               correctAnswer: questions[number].correct_answer
          };
          setUserAnswers((prev) => [...prev, AnswerObject]);
        }
   };

   const previousQuestion = () => {
       const prev = number - 1;
       if (prev === -1) {
         setBack(false);
       }
       else if (number >= 1) {
         setNumber(prev);
       }
      //  else{
      //    setNumber(prev);
      //  }
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
          <h1>Music Quiz</h1>
          {gameOver || userAnswers.length === TOTAL_QUESTIONS ? ( 
              <button className="start" onClick={startTrivial}>
                Start
              </button>) : null
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

            {!loading && !gameOver && (
            <QuestionCard 
              question={questions[number].question}
              answers={questions[number].answers}
              callback={checkAnswer}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              questionNr={number + 1} //Every time you jump into the next question,
                                        // it should be number + 1
              totalQuestions={TOTAL_QUESTIONS}
            />)
            }

            {
              !loading && back && userAnswers.length !== 0 && number >= 1 ? (
                  <button className = "previous" onClick={previousQuestion}>
                      Previous
                  </button>): null
            }
            
            {!loading && !gameOver && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
                <button className="next" onClick={nextQuestion}>
                  Next
                </button>): null
            }
        
      </>
  );
}

export default App;

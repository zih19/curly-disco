import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
// Components
import QuestionCard from './components/QuestionCard';
//Type
import {QuestionState, Difficulty} from './API';
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
   const[loading, setLoading] = useState(false);
   const[questions, setQuestions] = useState<QuestionState[]>([]);
   const[number, setNumber] = useState(0);
   const[userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
   const[score, setScore] = useState(0);
   const[gameOver, setGameOver] = useState(true);
   const[returnBack, setReturnBack] = useState(true);

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
          const answerObject = {
               question: questions[number].question,
               answer: answer_selected,
               correct: correct_Answer,
               correctAnswer: questions[number].correct_answer
          };
          setUserAnswers((prev) => [...prev, answerObject]);
        }

   };

  //  const previousQuestion = () => {
  //      const prev = number - 1;
  //      if (prev === 1) {
  //          setReturnBack(false);
  //      }
  //      else{
  //          setNumber(prev);
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

          {!gameOver? (
              <p className="score">
                Score:{score}
              </p>) :null
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
            
            
            {!loading && !gameOver && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
                <button className="next" onClick={nextQuestion}>
                  Next
                </button>): null
            }  
        
      </>
  );
}

export default App;

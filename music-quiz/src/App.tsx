import React, { useState } from 'react';
import {fetchQuizQuestions} from './API';
// Components
import QuestionCard from './components/QuestionCard';
//Type
import {QuestionState, Difficulty} from './API';

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {
   const[loading, setLoading] = useState(false);
   const[questions, setQuestions] = useState<QuestionState[]>([]);
   const[number, setNumber] = useState(0);
   const[userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
   const[score, setScore] = useState(0);
   const[gameOver, setGameOver] = useState(true);

   console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)); 


   const startTrivial = () => {
        // We want to make the API call(start the game) 
        // with the function called async().
        setLoading(true);
        setGameOver(false);

        const newQuestions = await fetchQuizQuestions(
          TOTAL_QUESTIONS,
          Difficulty.EASY
        );

        setQuestions(questions);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);


   };
    
   const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        // deal with the scenario when the user triggers 
        // an answer for the question.
   };

   const nextQuestion = () => {
        // concentrate on the specific instance at which the user
        // selects the next question.
   };

  return (
     <div className="App">
         <h1>Music Quiz</h1>
         <button className="start" onClick={startTrivial}>Start</button>
         <p className="score">Score:</p>
         <p>Loading Questions: ...</p>
         {/* <QuestionCard 
            question={questions[number].question}
            answers={questions[number].answers}
            callback={checkAnswer}
            userAnswer={userAnswers? userAnswers[number] : undefined}
            questionNr={number + 1} //Every time you jump into the next question,
                                      // it should be number + 1
            totalQuestions={TOTAL_QUESTIONS}

         /> */}
         <button className="next" onClick={nextQuestion}>Next</button>
     </div>
  );
}

export default App;

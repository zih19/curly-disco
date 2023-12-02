import React from 'react';
import { ButtonGroupsOne, SquaredButton } from './AnswerButtons.styles';


// First of all, the buttons are able to be created 
// using the built-in interface in tsx.

interface ButtonGroupProps {
   answers: string[]
   onAnswerClick: (answer: string) => void
   answerSelected: {
      answer: string,
      isCorrect: boolean,
      correctAnswer: string
   } | null;
}

const AnswerButtonsTwo: React.FC<ButtonGroupProps> = ({answers, onAnswerClick, answerSelected}) => {
 
   return (
   <> 
      <ButtonGroupsOne>
      {
         answers.map((answer) => {
            
            let buttonColor = "#0074d9";

            if (answerSelected) {
               if (answerSelected.answer === answer) {
                 buttonColor = answerSelected.isCorrect ? "green" : "red";
               }
               else if (answer === answerSelected.correctAnswer) {
                  buttonColor = "green";
               }
            }
           
            return (
               <SquaredButton key={answer} 
                              onClick={()=>onAnswerClick(answer)}
                              style={{backgroundColor: buttonColor}}>
                     {answer}
               </SquaredButton>
            );
         })
      };
      </ButtonGroupsOne>
   </>
   );
};
export default AnswerButtonsTwo;
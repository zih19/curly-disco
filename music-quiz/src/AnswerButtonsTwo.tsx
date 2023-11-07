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
   } | null;
}

const AnswerButtonsTwo: React.FC<ButtonGroupProps> = ({answers, onAnswerClick, answerSelected}) => {
  
   return (
   <>
      <ButtonGroupsOne>
      {
         answers.map((answer) => (
            <SquaredButton key={answer} onClick={()=>onAnswerClick(answer)} 
                           style={{backgroundColor: answerSelected?.answer === answer
                                   ? answerSelected?.isCorrect
                                      ? "green"
                                      : "red"
                                   : "initial"}}>
                  {answer}
            </SquaredButton>
         ))
         
      }
      </ButtonGroupsOne>
   </>
  
  );
};
export default AnswerButtonsTwo;
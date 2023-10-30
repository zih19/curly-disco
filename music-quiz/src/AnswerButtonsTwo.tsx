import React from 'react';
import { ButtonGroupsOne, SquaredButton } from './AnswerButtons.styles';


// First of all, the buttons are able to be created 
// using the built-in interface in tsx.

interface ButtonGroupProps {
   answers: string[]
   onAnswerClick: (answer: string) => void
}

const AnswerButtonsTwo: React.FC<ButtonGroupProps> = ({answers, onAnswerClick}) => {
  
   return (
   <>
      <ButtonGroupsOne>
      {
         answers.map((answer) => (
            <SquaredButton onClick={()=>onAnswerClick(answer)}>
                  {answer}
            </SquaredButton>
         ))
         
      }
      </ButtonGroupsOne>
   </>
  
  );
};
export default AnswerButtonsTwo;
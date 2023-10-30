
import { CenteredContainer, SelectDifficulty, ButtonContainer, SelectedButton } from './Style/Menu.styles';
import { useNavigate } from 'react-router-dom';

const GameMode = () => {

  const navigate = useNavigate();
  
  
  const start = () => navigate('/menu/gamestart/play')


  return (
    <CenteredContainer>

       <SelectDifficulty> Select the Level You want to focus on</SelectDifficulty>
       <ButtonContainer>
          <SelectedButton onClick={start}> Easy </SelectedButton>
          <SelectedButton onClick={start}> Medium </SelectedButton>
          <SelectedButton onClick={start}> Hard </SelectedButton>
          <SelectedButton onClick={start}> Insane </SelectedButton>
       </ButtonContainer>

    </CenteredContainer>
    
  );

}

export default GameMode;
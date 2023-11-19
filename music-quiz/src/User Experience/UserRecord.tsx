import {useLocation, useNavigate} from 'react-router-dom';
import { ReturnButton } from '../GameContent.styles';

const UserRecord = () => {
   
    const location = useLocation();
    const {score, difficulty} = location.state;

    const RestartNewRound = () => {
        const navigate = useNavigate()
        navigate('/menu/gamestart')
    }

    return(
       <div>
           <h1> User Data</h1>
           <p> Score: {score}</p>
           <p> Difficulty: {difficulty}</p>

          <ReturnButton className="return" onClick={RestartNewRound} > Restart Game </ReturnButton>
       </div>
    );
};
export default UserRecord;
import {useLocation, useNavigate} from 'react-router-dom';

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

          <button className="return" onClick={RestartNewRound} > Restart Game </button>
       </div>
    );
};
export default UserRecord;
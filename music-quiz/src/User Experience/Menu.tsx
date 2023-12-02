import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {CenteredContainer, WelcomeMessage, ButtonContainer, SelectedButton} from './Style/Menu.styles';


const Menu: React.FC = () => {
    const [userName, setUserName] = useState<string|null>(null);

    useEffect(() => {
       const storedUsername = localStorage.getItem('username');
       if(storedUsername) {
          setUserName(storedUsername);
       }
    },[]);

    const navigate = useNavigate();

    const GameMode = () => {
        navigate('/menu/gamestart');
    }

    const UserData = () => {
        navigate('/menu/userdata');
    }

    const logOut = () => {
        navigate('/');
    }


    return(
        <CenteredContainer>
           
            {userName?
                <WelcomeMessage>Welcome {userName}! You have successfully logged in.</WelcomeMessage>
                :<WelcomeMessage>No user information found.</WelcomeMessage>
            }

           <ButtonContainer>
                <SelectedButton onClick={GameMode}>Games</SelectedButton>
                <SelectedButton onClick={UserData}>User Data</SelectedButton>
                <SelectedButton onClick={logOut}>Log Out </SelectedButton>
            </ButtonContainer>

        </CenteredContainer>
        
    );

}
export default Menu;
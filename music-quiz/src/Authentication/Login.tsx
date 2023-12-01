import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import { Wrapper, Header, FormGroup, Label, Input, SubmitButton} from './Style/User.styles';
import axios from 'axios';

const Login = () => {
  const[form, setForm] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const{name, value} = e.target;
    setForm({...form, [name]:value})
  }

  //const history = useHistory();
  //const user = [{username:"zih19", password:"123456"}]
  //const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/login/', form);
      console.log('Login successful');
      console.log(response.data);
      navigate('/menu');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Login failed:', error.response ? error.response.data : error.message); //failing here
      } else {
          console.error('Login failed:', error);
      }
      alert('Invalid username or password');
    }
  };
 

  return(
      
      <Wrapper>
      <div className="login-page">
            <Header> Login </Header>

            <form onSubmit={handleLogin}>
                    <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" 
                        name="username" 
                        value={form.username} 
                        onChange={handleInput}
                        required />

                    <Label htmlFor="password">Password</Label>
                    <Input type="password"
                        name="password" 
                        value={form.password} 
                        onChange={handleInput}
                        required />
                        
                    </FormGroup>
               <SubmitButton type="submit" >Login</SubmitButton>
            </form>

            {/* <div className="buttons">
                <SubmitButton type="submit">Login</SubmitButton>
                {/* <CancelButton type="button" onClick={() => {}}> 
                        Cancel
                </CancelButton> 
            </div>*/}

            <p>
                New to the User? <Link to='/register'> Register </Link>
            </p>
        
    </div>
    </Wrapper>
   );
}
export default Login;
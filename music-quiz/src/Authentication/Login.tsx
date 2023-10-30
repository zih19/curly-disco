import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import { Wrapper, Header, FormGroup, Label, Input, SubmitButton} from './Style/User.styles';

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

  const handleLogin = () => {
      const savedUserName = localStorage.getItem('username');
      const savedPassword = localStorage.getItem('password');
      if (form.username === savedUserName && form.password === savedPassword) {
        navigate("/menu");
      }
      else{
        alert('Invalid username or password')
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
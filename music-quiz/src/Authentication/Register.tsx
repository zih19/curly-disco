import React, { useState } from 'react';
import {Wrapper, Header, FormGroup, Label, Input, SubmitButton} from './Style/User.styles';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const[form, setForm] = useState({
       lastname: '',
       firstname: '',
       username: '',
       age: '',
       musicalYear: '',
       email: '',
       password:'',
       confirmedPassword: '',
    });

    // const[username, setUserName] = useState('');
    // const[age, setAge] = useState('');
    // const[musicalYear, setMusicalYear] = useState('');
    // const[email, setEmail] = useState('');
    // const[password, setPassword] = useState('');
    // const[confirmedpassword, setConfirmedPassword] = useState('');
    
     

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({...form, [name]:value});
    };

    const handleRegister = () => {
         // send a request or connection to the backend
         localStorage.setItem("firstname", form.firstname);
         localStorage.setItem("lastname", form.lastname);
         localStorage.setItem('username', form.username);
         localStorage.setItem('age', form.age);
         localStorage.setItem('musicalYear', form.musicalYear);
         localStorage.setItem('email', form.email);
         localStorage.setItem('password', form.password);
         localStorage.setItem('confirmedPassword', form.confirmedPassword);
         navigate("/register/success");
    };

   

    return(
        <Wrapper>
            <Header>Sign Up Your Account</Header>

            <p>Please Enter the following information below</p>
            
            <form onSubmit={handleRegister}>
                <FormGroup>
                    
                    <Label htmlFor="firstname">First Name</Label>
                    <Input type="text"
                           name="firstname" 
                           value={form.firstname}
                           onChange={handleInputChange}
                    />

                    <Label htmlFor="lastname">Last Name</Label>
                    <Input type="text" 
                           name="lastname"
                           value={form.lastname}
                           onChange={handleInputChange}
                    />
                   

                    <Label htmlFor="username">Username</Label>
                    <Input type="text"
                           name="username"
                           value={form.username}
                           onChange={handleInputChange}
                    />
                    
                    <Label htmlFor="age">Age</Label>
                    <Input type="text"
                           name="age"
                           value={form.age}
                           onChange={handleInputChange}
                    />

                    <Label htmlFor="musicalYear">Musical Year</Label>
                    <Input type="text"
                           name="musicalYear"
                           value={form.musicalYear}
                           onChange={handleInputChange}
                    />

                    <Label htmlFor="email">Email</Label>
                    <Input type="email" 
                           name="email" 
                           value={form.email}
                           onChange={handleInputChange} 
                    />

                    <Label htmlFor="password">Password</Label>
                    <Input type="password"
                           name="password"
                           value={form.password}
                           onChange={handleInputChange}
                    />

                    <Label htmlFor="confirmedPassword">Confirmed Password</Label>
                    <Input type="password"
                           name="confirmedPassword"
                           value={form.confirmedPassword}
                           onChange={handleInputChange}
                    />

                   
                </FormGroup>
                <SubmitButton type="submit"> Register </SubmitButton>
            </form>

            {/* <div className="button">
                <SubmitButton type="submit"> Register </SubmitButton>
            </div> */}
            

        </Wrapper>

    );
    


}
export default Register
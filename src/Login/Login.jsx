import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, FormGroup, Label, Input, Button, Title } from '../components/styles';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
  
   
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://nfc-1.onrender.com/login', formData)
      
      alert('Login successful!');
      Cookies.set('token', response.data.token, { expires: 1/24, secure: true });
     
navigate("/",{state: {tokendata:response.data.token}})

    } catch (error) {
        alert('email ID or password incorrect')
      console.error('There was an error logging in!', error);
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </FormGroup>
        <Button type="submit">Login</Button>
        <br />
        <br />
        <Button onClick={()=>{navigate('/signup')}}>Signup</Button>
      </Form>
    </Container>
  );
};

export default Login;

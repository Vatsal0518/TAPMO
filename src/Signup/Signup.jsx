import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Container, Form, FormGroup, Label, Input, Button, Title } from '../components/styles';


const Signup = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
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
      const response = await axios.post('https://nfc-1.onrender.com/signup', formData);
      console.log(response.data);
      alert('Signup successful!');
      navigate('/login')
     
      
    } catch (error) {
      alert('user already exist');
      navigate('/login')
        
       
      console.error( error);
    }
  };

  return (
    <Container>
      <Title>Create Account</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input 
            type="text" 
            id="username" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            required 
          />
        </FormGroup>
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
        <Button type="submit">Sign Up</Button>
        <br />
        <br />
        <Button onClick={()=>{navigate('/login')}}>Login</Button>
      </Form>
    
    </Container>
  );
};

export default Signup;

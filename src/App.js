import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './HomePage/Home'
import Login from './Login/Login'
import Signup from './Signup/Signup'
import Mycard from './components/Mycard'
import Admin from './Admin/Admin'
import IsAdmin from './Admin/IsAdmin'
import './App.css'
import UserCard from './UserCard/UserCard'
import Createcard from './CreateCard/Createcard'
import Editcard from './EditCard/Editcard'
import Navigation from './HomePage/Navigation'

function App() {
  return <>
  <div className='Main'>

  <BrowserRouter>
  <Navigation/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/mycard' element={<Mycard/>}/>
    <Route path='/admin' element={<Admin/>}/>
    <Route path='/isadmin' element={<IsAdmin/>}/>
    <Route path='/mycard/:id' element={<UserCard/>}/>
    <Route path='/createcard' element={<Createcard/>}/>
    <Route path='/mycard/edit/:id' element={<Editcard/>}/>


  </Routes>
  </BrowserRouter>
  </div>
  </>
    
  
}

export default App
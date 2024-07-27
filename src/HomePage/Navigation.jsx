import React from 'react'
import '../HomePage/Navigation.css'
import { Link, useNavigate } from 'react-router-dom'
import Home from './Home'
import Cookies from 'js-cookie'
import axios from 'axios'
import Dropdown from './Dropdown'
function Navigation() {
  const navigate = useNavigate()

  const [isUserLogin,setIsUserLogin] = React.useState(false);
  const [username,setusername] = React.useState()
  const token = Cookies.get('token')||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  const parts = token.split('.');
  const decodedPayload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
  const parsedPayload = JSON.parse(decodedPayload);

  React.useEffect(() => {
    // JWT token
   
    
  
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get('https://nfc-1.onrender.com/'+parsedPayload.userId, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setIsUserLogin(true)
    setusername(response.data.username)
      
        
      
      } catch (err) {

         
         
        
      }
    };

    fetchData();
  }, []); 


  

  return <>
  <div className="navbar">


  <div className="left">
    <div className="logo">
    <img height={50} src="logo.png" alt="" />
    </div>
    <div className="logoname">
        TEPMO
    </div>
    

  </div>

  <div className="middle">
    <ul>
        <li><Link to={'/'} element={<Home/>}>Home</Link></li>
        <li><Link to={'/createcard'} element={<Home/>}>Design Your card</Link></li>
        <li><Link to={'/compatibledevices'} element={<Home/>}>Comatible device</Link></li>
        <li><Link to={'/Contactus'} element={<Home/>}>Contact Us</Link></li>
  
       {isUserLogin? <li> <Dropdown username = {username}/></li>: <li><Link to={'/login'} element={<Home/>}>Profile</Link></li>}
       

    </ul>

  </div>

  <div className="right">
    About Us

  </div>


  </div>
  

  </>
}

export default Navigation
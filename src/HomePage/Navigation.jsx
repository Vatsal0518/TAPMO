// Navigation.js
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../HomePage/Navigation.css';
import Dropdown from './Dropdown';

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(Cookies.get('token') || '');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token');
      setToken(token || '');
      if (token) {
        const parts = token.split('.');
        const decodedPayload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
        const parsedPayload = JSON.parse(decodedPayload);

        try {
          const response = await axios.get(`https://nfc-1.onrender.com/${parsedPayload.userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setIsUserLogin(true);
          setUsername(response.data.username);
        } catch (error) {
          Cookies.remove('token');
          setToken('');
          setIsUserLogin(false);
        }
      } else {
        setIsUserLogin(false);
      }
    };

    fetchUserData();
  }, [location.pathname]);

  const handleLogout = () => {
    Cookies.remove('token');
    setToken('');
    setIsUserLogin(false);
    setUsername('');
    navigate('/'); // Redirect to home after logout
  };

  return (
    <nav>
      <img height={50} width={90} src="./logo.png" alt="Logo" />
      
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/services">Services</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        {isUserLogin ? (
          <li>
            <Dropdown username={username} />
            
          </li>
        ) : (
          <li><NavLink to="/login">Login</NavLink></li>
        )}
        <li>
          <NavLink to="/about">About us</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;

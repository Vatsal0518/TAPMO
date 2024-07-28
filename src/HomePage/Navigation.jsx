import React, { useState, useEffect } from 'react';
import '../HomePage/Navigation.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Dropdown from './Dropdown';

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [username, setUsername] = useState('');
  const token = Cookies.get('token') || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  const parts = token.split('.');
  const decodedPayload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
  const parsedPayload = JSON.parse(decodedPayload);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://nfc-1.onrender.com/${parsedPayload.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setIsUserLogin(true);
        setUsername(response.data.username);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [parsedPayload.userId, token]);

  return (
    <nav>
      <Link to="/" className="title">
        Website
      </Link>
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
          <NavLink to="/contact">About us</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;

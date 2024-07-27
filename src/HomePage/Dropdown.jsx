
import Cookies from 'js-cookie';
import './Navigation.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Dropdown = (prop) => {
    const navigate = useNavigate();

    const handlelogout =async()=>
    {
        try{
             Cookies.remove('token')
             window.location.reload()


        }
        catch(e)
        {
            console.log(e)
        }

    }
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="user-profile">
      <button className="user-profile-btn" onClick={toggleDropdown}>
        {prop.username}
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <button className="dropdown-btn">Settings</button>
          <button className="dropdown-btn" onClick={()=>{navigate('mycard')}}>My Cards</button>
          <button className="dropdown-btn" onClick={handlelogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

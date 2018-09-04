import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <div className="NavBar">        
          <Link to="/home">
            Home
          </Link>       
          <Link to="/dashboard">
            Dashboard
          </Link>        
          <Link to="/admin">
            Admin
          </Link>
  </div>
);

export default NavBar;
import React from 'react';
import { Link, Route, Router, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const NavBar = () => (
  <div className="NavBar">
        <li>
          <Link to="/home">
            Home
          </Link>
        </li><li>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin">
            Admin
          </Link>
        </li>
  </div>
);

export default NavBar;
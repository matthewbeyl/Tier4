import React from 'react';
import NavBar from '../NavBar/NavBar';

const Header = ({ title }) => (
  <div className="instructions">
    <div>
      <h1 className="lead">{ title }</h1>
    </div>
  </div>
);

export default Header;

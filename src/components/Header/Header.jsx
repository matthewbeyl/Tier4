import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';

class Header extends Component {

 render(){
   return (
     <div className="instructions">
       <div>
         <h1 className="lead">{this.props.title}</h1>
         <NavBar />
       </div>
     </div>
   )
 }
}


export default Header;
import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';

class Header extends Component {
<<<<<<< HEAD
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
=======

  render() {
>>>>>>> 45fcb75c715d484f0aa61fa367710ec2eff29036

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
import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';

// const Header = ({ title }) => (
//   <div className="instructions">
//     <div>
//       <h1 className="lead">{ title }</h1>
//       <NavBar />
//     </div>
//   </div>
// );

class Header extends Component {
  constructor(props){
    super(props);
  }

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
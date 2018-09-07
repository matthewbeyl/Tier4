import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import LOGIN_ACTIONS from '../../redux/actions/loginActions'

class NavBar extends Component {

  componentWillMount() {
    this.props.dispatch({
        type: USER_ACTIONS.FETCH_USER
    })
  }


  logout = () => {
    this.props.dispatch({type: LOGIN_ACTIONS.LOGOUT})
  }

  signInSignOut = () => {
    try { 
      if(this.props.user.github){
        return(
          <button onClick={this.logout}>Log out</button>
        )
      } else {
        return (<a href="http://localhost:5000/api/auth/login">Log In</a>);
      } 
    } catch (error) {
      return (<a href="http://localhost:5000/api/auth/login">Log In</a>);
    }
  }

  render() {
    console.log('USER', this.props.user);
    
    return (
      <div className="NavBar" >
        <Link to="/home">
          Home
          </Link>
        <Link to="/dashboard">
          Dashboard
          </Link>
        <Link to="/admin">
          Admin
          </Link>
        {this.signInSignOut()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  challengedate: state.challengedate,
  user: state.user.user
});

export default connect(mapStateToProps)(NavBar);
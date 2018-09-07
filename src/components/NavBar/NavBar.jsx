import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import LOGIN_ACTIONS from '../../redux/actions/loginActions'
import {Button} from '@material-ui/core'

class NavBar extends Component {

  componentWillMount() {
    this.props.dispatch({
        type: USER_ACTIONS.FETCH_USER
    })
  }


  logout = () => {
    this.props.dispatch({type: LOGIN_ACTIONS.LOGOUT})
  }

  logInLogOut = () => {
    try { 
      if(this.props.user.github){
        return(
          <Button variant="outlined" onClick={this.logout}>Log out</Button>
        )
      } else {
        return (<Button variant="outlined" href="http://localhost:5000/api/auth/login">Log In</Button>);
      } 
    } catch (error) {
      return (<Button variant="outlined" href="http://localhost:5000/api/auth/login">Log In</Button>);
    }
  }

  adminNav = () => {
    try { 
      if(this.props.user.admin){
        return(
          <Link to="/admin">
            Admin
          </Link>
        )
      } else {
        return null;
      } 
    } catch (error) {
      return null;
    }
  }

  dashboardNav = () => {
    try { 
      if(this.props.user.github && !this.props.user.admin){
        return(
          <Link to="/dashboard">
            Dashboard
          </Link>
        )
      } else {
        return null;
      } 
    } catch (error) {
      return null;
    }
  }

  render() {
    return (
      <div className="NavBar" >
        <Link to="/home">
          Home
          </Link>
        {this.dashboardNav()}
        {this.adminNav()}
        {this.logInLogOut()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  challengedate: state.challengedate,
  user: state.user.user
});

export default connect(mapStateToProps)(NavBar);
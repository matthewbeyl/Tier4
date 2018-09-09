import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import LOGIN_ACTIONS from '../../redux/actions/loginActions';

import { Toolbar, Typography, Button } from '@material-ui/core';

const mapStateToProps = state => ({
  user: state.user.user
});

const HomeLink = props => <Link to="/home" {...props} />
const DashLink = props => <Link to="/dashboard" {...props} />
const AdminLink = props => <Link to="/admin" {...props} />
const LoginLink = props => <Link to="http://localhost:5000/api/auth/login" {...props} />

class NavBar extends Component {

  componentWillMount() {
    this.props.dispatch({
      type: USER_ACTIONS.FETCH_USER
    })
  }


  logout = () => {
    this.props.dispatch({ type: LOGIN_ACTIONS.LOGOUT })
  }

  signInSignOut = () => {
    try {
      if (this.props.user.github) {
        return (
          <Button onClick={this.logout}>Log out</Button>
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
      <Toolbar disableGutters="true">
          <Button component={HomeLink}>
          Home
          </Button>
          <Button component={DashLink}>
          Dashboard
          </Button>
          <Button component={AdminLink}>
          Admin
          </Button>
          <Typography variant="display1" color="inherit">
            Welcome
          </Typography>
          {this.signInSignOut()}
      </Toolbar>
    )
  }
}

// const mapStateToProps = state => ({
//   challengedate: state.challengedate,
//   user: state.user.user
// });

export default connect(mapStateToProps)(NavBar);
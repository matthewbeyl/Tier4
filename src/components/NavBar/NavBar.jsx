import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import LOGIN_ACTIONS from '../../redux/actions/loginActions';

import { Toolbar, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const HomeLink = props => <Link to="/home" {...props} />
const DashLink = props => <Link to="/dashboard" {...props} />
const AdminLink = props => <Link to="/admin" {...props} />
const LoginLink = props => <Link to="http://localhost:5000/api/auth/login" {...props} />
const TestLink = props => <Link to="www.google.com" {...props} />

export const styles = theme => ({
  toolBar: {
    margin: theme.spacing.unit,
    position: 'bottom',
    // display: 'flex',
    // alignItems: 'center',
  }
})

class NavBar extends Component {

  componentWillMount() {
    this.props.dispatch({
      type: USER_ACTIONS.FETCH_USER
    })
  }

  logout = () => {
    this.props.dispatch({ type: LOGIN_ACTIONS.LOGOUT })
  }

  logInLogOut = () => {
    try { 
      if(this.props.user.github){
        return(
          <Button onClick={this.logout}>Log out</Button>
        )
      } else {
        return (<Button href="http://localhost:5000/api/auth/login">Log In</Button>);
      } 
    } catch (error) {
      return (<Button href="http://localhost:5000/api/auth/login">Log In</Button>);
    }
  }

  adminNav = () => {
    try {
      if (this.props.user.admin) {
        return (
          <Button component={AdminLink}>
            Admin
          </Button>
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
      if (this.props.user.github && !this.props.user.admin) {
        return (
          <Button component={DashLink}>
            Dashboard
         </Button>
        )
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Toolbar disableGutters="false" postion="sticky" className={classes.toolBar}>
        <Button component={HomeLink}>
          Home
        </Button>
        {this.dashboardNav()}
        {this.adminNav()}
        <Typography variant="display2" color="inherit">
           Tier Four
         </Typography>
        {this.logInLogOut()}
      </Toolbar>
    )
  }
}

const mapStateToProps = state => ({
  challengedate: state.challengedate,
  user: state.user.user
});

const StyledNavBar = withStyles(styles)(NavBar);
export default connect(mapStateToProps)(StyledNavBar);
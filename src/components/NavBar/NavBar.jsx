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

const styles = theme => ({

  root: {

  },
  toolBar: {
    // background: theme.palette.primary.main,
    backgroundImage: 'linear-gradient(black, grey)',
    height: 200,
    margin: 0,
    textAlign: "center"
  },
  title: {
    
  }
});


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
      if (this.props.user.github) {
        return (
          <Button color="secondary" onClick={this.logout}>Log out</Button>
        )
      } else {
        return (<Button color="secondary" href="http://localhost:5000/api/auth/login">Log In</Button>);
      }
    } catch (error) {
      return (<Button color="secondary" href="http://localhost:5000/api/auth/login">Log In</Button>);
    }
  }

  adminNav = () => {
    try {
      if (this.props.user.admin) {
        return (
          <Button color="secondary" component={AdminLink}>
            Admin
          </Button>
        )
      }
      else {
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
          <Button color="secondary" component={DashLink}>
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

    let { classes } = this.props

    return (
      <div className={classes.root}>
        <Toolbar className={classes.toolBar}>
          <img src="https://dewiskbohv5c1.cloudfront.net/assets/logo-prime-horizontal-6909d23113b83bd59bf681f26f940f97.svg" alt="" height="40%" width="auto" />
          <Typography className={classes.title} variant="display2" color="secondary">
            Tier Four
          </Typography>
          <Button component={HomeLink} color="secondary">
            Home
          </Button>
          {this.dashboardNav()}
          {this.adminNav()}


          {this.logInLogOut()}

        </Toolbar>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  challengedate: state.challengedate,
  user: state.user.user
});

const StyledNavBar = withStyles(styles)(NavBar);
export default connect(mapStateToProps)(StyledNavBar);
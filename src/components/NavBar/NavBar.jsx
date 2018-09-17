import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import LOGIN_ACTIONS from '../../redux/actions/loginActions';
import swal from 'sweetalert'

import { Toolbar, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const HomeLink = props => <Link to="/home" {...props} />
const DashLink = props => <Link to="/dashboard" {...props} />
const AdminLink = props => <Link to="/admin" {...props} />

const styles = theme => ({

  root: {

  },
  toolBar: {
    display: 'flex',
    backgroundImage: 'linear-gradient(#07AA9E, #222222)',
    height: 150,
    margin: 0,
    // backgroundImage: 'linear-gradient(to bottom, rgb(0,0,0,1) , rgb(0,0,0,0))',

  },
  logOut: {
    display: 'flex',
    // justifyContent: 'flexEnd'
  },
  logo: {
    // marginRight: 200
  },
  title: {
    // marginRight: 100
  },
  toolDiv: {
    // display: 'flex',
  }
});


class NavBar extends Component {

  

  componentWillMount() {
    this.props.dispatch({
      type: USER_ACTIONS.FETCH_USER
    })
  }

  logout = () => {
    swal({
      title: "Are you sure you want to log out?",
      buttons: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.props.dispatch({ type: LOGIN_ACTIONS.LOGOUT })
      } else {
      }
    });
  }

  logInLogOut = () => {
    let { classes } = this.props

    try {
      if (this.props.user.github) {
        return (
          <Button className={classes.logOut} color="secondary" onClick={this.logout}>Log out</Button>
        )
      } else {
        return (<Button className={classes.logOut} color="secondary" href="http://localhost:5000/api/auth/login">Log In</Button>);
      }
    } catch (error) {
      return (<Button className={classes.logOut} color="secondary" href="http://localhost:5000/api/auth/login">Log In</Button>);
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
            {this.props.user.name}
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
      <div className={classes.toolDiv}>
        <Toolbar className={classes.toolBar}>
          <img src="https://dewiskbohv5c1.cloudfront.net/assets/logo-prime-horizontal-6909d23113b83bd59bf681f26f940f97.svg" alt="" height="40%" width="auto" className={classes.logo} />
          <Typography className={classes.title} variant="display2" color="secondary">
            Tier Four
          </Typography>
          <Button component={HomeLink} color="secondary">
            Home
          </Button>
          {this.dashboardNav()}
          {this.adminNav()}
          <div className={classes.logOut}>
            {this.logInLogOut()}
          </div>
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
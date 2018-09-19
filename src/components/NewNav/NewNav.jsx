import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { LOGIN_ACTIONS } from '../../redux/actions/loginActions';

import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';


const HomeLink = props => <Link to="/home" {...props} />
const DashLink = props => <Link to="/dashboard" {...props} />
const AdminLink = props => <Link to="/admin" {...props} />

const styles = theme => ({

    header: {
        display: 'flex',
        backgroundImage: 'linear-gradient(#07AA9E, #222222)',
        height: 150,
        margin: 0,
    },
    logo: {
        marginTop: 20,
        marginLeft: 10,
    },
    logout: {
        marginLeft: 550,
    },
    newNav: {
        marginLeft: 30,
        marginTop: -20,
        marginBottom: 50,
    }
})

class NewNav extends Component {

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

    //conditionally rendering login/logout buttons dependant on whether the user is logged in with GitHub
    logInLogOut = () => {
        let { classes } = this.props
        try {
            if (this.props.user.github) {
                return (
                    <Button color="secondary" onClick={this.logout}>Log out</Button>
                )
            } else {
                return (<Button  color="secondary" href="http://localhost:5000/api/auth/login">Log In</Button>);
            }
        } catch (error) {
            return (<Button  color="secondary" href="http://localhost:5000/api/auth/login">Log In</Button>);
        }
    }

    //conditionally rendering login/logout buttons dependant on whether the user is marked as admin in Database
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

    //displays user's name from github if logged in
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
            <div className={classes.newNav}>
                <Button component={HomeLink} color="secondary">
                    Home
                </Button>
                {this.dashboardNav()}                
                {this.adminNav()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    challengedate: state.challengedate,
    user: state.user.user
});

const StyledNewNav = withStyles(styles)(NewNav)
export default connect(mapStateToProps)(StyledNewNav);
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { LOGIN_ACTIONS } from '../../redux/actions/loginActions';

import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import NewNav from '../NewNav/NewNav';


const HomeLink = props => <Link to="/home" {...props} />
const DashLink = props => <Link to="/dashboard" {...props} />
const AdminLink = props => <Link to="/admin" {...props} />

const styles = theme => ({

    header: {
        display: 'flex',
        height: 100,
        margin: 0,
    },
    logo: {
        marginTop: 20,
        marginLeft: 20,
    },
    logout: {
        marginTop: 10,
        marginLeft: 800,
       
    },
    gradiant: {
        backgroundImage: 'linear-gradient(#07AA9E, #222222)',
    }
})


class Header extends Component {

    componentWillMount() {
        this.props.dispatch({
            type: USER_ACTIONS.FETCH_USER
        })
    }

    logout = () => {
        this.props.dispatch({ type: LOGIN_ACTIONS.LOGOUT })
    }

    logInLogOut = () => {
        let { classes } = this.props

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
            <div className={classes.gradiant}>
                <div className={classes.header}>
                    <img src="https://dewiskbohv5c1.cloudfront.net/assets/logo-prime-horizontal-6909d23113b83bd59bf681f26f940f97.svg" alt="" height="50%" width="auto" className={classes.logo} />
                    <div className={classes.logout}>
                        {this.logInLogOut()}
                    </div>
                </div>
                <NewNav />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    challengedate: state.challengedate,
    user: state.user.user
});

const StyledHeader = withStyles(styles)(Header)
export default connect(mapStateToProps)(StyledHeader);
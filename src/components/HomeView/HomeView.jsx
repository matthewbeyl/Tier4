import React, { Component } from 'react';
import Header from '../Header/Header';
import { fetchStartDate } from '../../redux/actions/countdownActions';
import { connect } from 'react-redux';
import axios from 'axios';
import Countdown from '../Countdown/Countdown';
import LOGIN_ACTIONS from '../../redux/actions/loginActions'
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    challengeDate: state.challengeDate,
    user: state.user.user
});

class HomeView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            challengeDate: ''
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchStartDate()); 
    }

    componentWillMount() {
        this.props.dispatch({
            type: USER_ACTIONS.FETCH_USER
        })
    }

    login = () => {
        this.props.dispatch({type: LOGIN_ACTIONS.LOGIN})
    }

    handleInputChange = (event) => {
        this.setState({
            challegeDate: event.target.value
        })
    }

    reqDotUser = () => {
        console.log('from REDUX, USER:', this.props.user);
        
    }

    render() {
        return (
            <main>
                <Header title="Tier Four" />
                <button onClick={this.reqDotUser}>Log req.user</button>
                {/* <button onClick={this.logout}>Sign out</button>
                <a href="http://localhost:5000/api/auth/login">Sign In</a> */}
                <br />
                <Countdown />
            </main >
        )
    }
}

export default connect(mapStateToProps)(HomeView);




import React, { Component } from 'react';
import Header from '../Header/Header';
import { fetchStartDate } from '../../redux/actions/countdownActions';
import { connect } from 'react-redux';
import axios from 'axios';
import Countdown from '../Countdown/Countdown';
import LOGIN_ACTIONS from '../../redux/actions/loginActions'
import { USER_ACTIONS } from '../../redux/actions/userActions';


const mapStateToProps = state => ({
    challengedate: state.challengedate,
    user: state.user
});


class HomeView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            challengedate: '',
        }
    }

    componentWillMount() {
        this.props.dispatch({
            type: USER_ACTIONS.FETCH_USER
        })
    }

    componentDidMount() {
        this.props.dispatch(fetchStartDate());
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
        axios.get('/api/auth/profile').then(response => {
            console.log(response.data);

        }).catch(err => {
            console.log(err);
        })
        console.log('from REDUX, USER:', this.props.user.user);
        
    }

    render() {
        return (
            <main>
                <Header title="Tier Four" />
                <button onClick={this.reqDotUser}>Log req.user</button>
<<<<<<< HEAD
                <button onClick={this.logout}>Sign out</button>
                <a href="http://localhost:5000/api/auth/login">Sign In</a>
                <br />
                <Countdown />
=======
                <button onClick={this.logout}>Log out</button>
                <a href="http://localhost:5000/api/auth/login">Log In</a>
>>>>>>> 45fcb75c715d484f0aa61fa367710ec2eff29036
            </main >
        )
    }
}

export default connect(mapStateToProps)(HomeView);




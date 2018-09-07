import React, { Component } from 'react';
import Header from '../Header/Header';
import { fetchStartDate } from '../../redux/actions/countdownActions';
import { connect } from 'react-redux';
import axios from 'axios';
import Countdown from '../Countdown/Countdown';

const mapStateToProps = state => ({
    challengedate: state.challengedate
});


class HomeView extends Component {

    componentDidMount() {
        this.props.dispatch(fetchStartDate());
    }

    logout = () => {
        axios.get('/api/auth/logout').then(response => {
            alert('Logged out')
        }).catch(err => {
            alert('error on logout', err)
        })
    }

    reqDotUser = () => {
        axios.get('/api/auth/profile').then(response => {
            console.log(response.data);

        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <main>
                <Header title="Tier Four" />
                <button onClick={this.reqDotUser}>Log req.user</button>
                <button onClick={this.logout}>Sign out</button>
                <a href="http://localhost:5000/api/auth/login">Sign In</a>
                <br />
                <Countdown />
            </main >
        )
    }
}

export default connect(mapStateToProps)(HomeView);




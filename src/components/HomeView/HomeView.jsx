import React, { Component } from 'react';
import { fetchStartDate } from '../../redux/actions/homeActions';
import { connect } from 'react-redux';
import Countdown from '../Countdown/Countdown';
import LOGIN_ACTIONS from '../../redux/actions/loginActions'
import { USER_ACTIONS } from '../../redux/actions/userActions';
import NavBar from '../NavBar/NavBar';

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
                <NavBar />
                <button onClick={this.reqDotUser}>Log req.user</button>
                <br />
                <Countdown />
            </main >
        )
    }
}

export default connect(mapStateToProps)(HomeView);




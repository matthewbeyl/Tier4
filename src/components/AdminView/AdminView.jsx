import React, { Component } from 'react';
import { connect } from 'react-redux';
import PastChallenges from '../PastChallenges/PastChallenges';
import CurrentChallenge from '../CurrentChallenge/CurrentChallenge';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { CHALLENGE_ACTIONS } from '../../redux/actions/challengeActions';
import Header from '../Header/Header';
import {Tabs, Tab, Paper} from '@material-ui/core';


// CREATE BUTTON DISABLED WHEN THERE IS NO CURRENT CHALLENGE AND A CHALLENGE ALREADY CREATED FOR THE FUTURE
const mapStateToProps = state => ({
    user: state.user.user,
    login: state.login,
});

class AdminView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayCurrentChallenge: true,
            displayPastChallenges: false,
            value: 0,
        }
    }

    componentWillMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: CHALLENGE_ACTIONS.FETCH_ACTIVE_CHALLENGE });
    }

    componentDidUpdate() {
        if (this.props.user === null || !this.props.user.admin) {
            this.props.history.push('/home');
        }
    }

    displayCurrentChallenge = () => {
        if (this.state.displayPastChallenges === true) {
            this.setState({
                displayPastChallenges: false
            })
        }
        if (this.state.displayCurrentChallenge === false) {
            this.setState({
                displayCurrentChallenge: true
            })
        }
    }

    displayPastChallenges = () => {
        if (this.state.displayCurrentChallenge === true) {
            this.setState({
                displayCurrentChallenge: false
            })
        }
        if (this.state.displayPastChallenges === false) {
            this.setState({
                displayPastChallenges: true
            })
        }
    }

    handleDisplayChange = (event, value) => {
        this.setState({
            value: value
        })
    }

    render() {
        const { value, displayCurrentChallenge, displayPastChallenges } = this.state;
        // check is user is admin: 
        let content = (
            <div>
                <Paper>
                <Tabs
                    style={{float:"right"}}
                    value={value}
                    indicatorColor="primary"
                    onChange={this.handleDisplayChange}>
                    <Tab
                        label="Current Challenge"
                        onClick={this.displayCurrentChallenge} />
                    <Tab
                        label="Past Challenges"
                        onClick={this.displayPastChallenges} />
                </Tabs>
                {/* <p>Welcome, {this.props.user.name}</p> */}
                <div>
                    {displayPastChallenges && <PastChallenges />}
                </div>
                <div>
                    {displayCurrentChallenge && <CurrentChallenge />}
                </div>
                </Paper>
            </div>
        );
        return (
            <main>
                <Header />
                {content}
            </main>
        )
    }
}

export default connect(mapStateToProps)(AdminView);
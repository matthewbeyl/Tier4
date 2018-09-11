import React, { Component } from 'react';
import { connect } from 'react-redux';
// import CreateNewChallengeForm from '../CreateNewChallengeForm/CreateNewChallengeForm.js';
import PastChallenges from '../PastChallenges/PastChallenges';
import CurrentChallenge from '../CurrentChallenge/CurrentChallenge';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { CHALLENGE_ACTIONS } from '../../redux/actions/challengeActions';
import NavBar from '../NavBar/NavBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const mapStateToProps = state => ({
    user: state.user.user,
    login: state.login,
    checkChallengeStatus: state.challenge.active
});

class AdminView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayCurrentChallenge: true,
            displayPastChallenges: false,
            adminName: '',
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

    checkChallengeStatus = () => {
        this.setState({
            activeChallenge: true
        })
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

        if (this.props.checkChallengeStatus.length === 0){
            console.log('no current challenge');

        } else {
            console.log('active challenge');
        }
        const { value } = this.state;
        let content = null;
        content = (
            <div>
                <p>Welcome,{this.state.adminName}</p>
                <Tabs
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
             
                {this.state.displayPastChallenges ? <PastChallenges /> : null}
                {this.state.displayCurrentChallenge ? <CurrentChallenge /> : null}
            </div>
        );
        return (
            <main>
                <NavBar />
                {content}
            </main>
        )
    }
}

export default connect(mapStateToProps)(AdminView);
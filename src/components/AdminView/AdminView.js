import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import CreateNewChallengeForm from '../CreateNewChallengeForm/CreateNewChallengeForm.js';
import PastChallenges from '../PastChallenges/PastChallenges';
import CurrentChallenge from '../CurrentChallenge/CurrentChallenge';

const mapStateToProps = state => ({
    user: state.user,
    login: state.login,
});

class AdminView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopupForm: false,
            displayCurrentChallenge: false,
            displayPastChallenges: false
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_CURRENT_CHALLENGE' });
    }

    displayCurrentChallenge = () => {
        console.log('show current challenge');
        this.setState({
            displayCurrentChallenge: !this.state.displayCurrentChallenge,
        })
        console.log(this.state.displayCurrentChallenge);
    }

    displayPastChallenges = () => {
        console.log('show past challenges');
        this.setState({
            displayPastChallenge: !this.state.displayPastChallenge,
        })
        console.log(this.state.displayPastChallenge);
    }

    toggleCreateNewChallengePopupForm = () => {
        this.setState({
            showPopupForm: !this.state.showPopupForm
        });
    }

    render() {
        return (
            <main>
                <Header title="Tier Four" />
                <h1>This is the Admin View</h1>
                <button onClick={this.toggleCreateNewChallengePopupForm.bind(this)}>Create New Challenge</button>
                {this.state.showPopupForm ?
                    <CreateNewChallengeForm
                        text='Create a New Challenge'
                        closePopupForm={this.toggleCreateNewChallengePopupForm.bind(this)}
                    />: null
                }
                <button onClick={this.displayCurrentChallenge}>Current Challenge</button>
                <button onClick={this.displayPastChallenges}>Past Challenges</button>
                {this.state.displayPastChallenge ?
                <PastChallenges 
                />: null 
                }
                {this.state.displayCurrentChallenge ?
                <CurrentChallenge 
                />: null 
                }
            </main>
        )
    }
}

export default connect(mapStateToProps)(AdminView);
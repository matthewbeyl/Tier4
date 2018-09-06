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
            displayCurrentChallenge: true,
            displayPastChallenges: false
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_CURRENT_CHALLENGE' });
    }

    displayCurrentChallenge = () => {
        if(this.state.displayPastChallenges === true){
            this.setState({
                displayPastChallenges: false
            })
        }
        this.setState({
            displayCurrentChallenge: !this.state.displayCurrentChallenge,
        })
    }

    displayPastChallenges = () => {
        if(this.state.displayCurrentChallenge === true){
            this.setState({
                displayCurrentChallenge: false
            })
        }
        this.setState({
            displayPastChallenges: !this.state.displayPastChallenges,
        })
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
                {this.state.displayPastChallenges ?
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
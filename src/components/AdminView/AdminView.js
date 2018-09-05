import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import CreateNewChallengeForm from '../CreateNewChallengeForm/CreateNewChallengeForm.js';

const mapStateToProps = state => ({
    user: state.user,
    login: state.login,
    currentChallengeData: state.challenge.current
});

class AdminView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopupForm: false
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_CURRENT_CHALLENGE' });
    }

    showCurrentChallenge = () => {
        console.log('current challenge button clicked');
    }

    showPastChallenges = () => {
        console.log('past challenge button clicked');
    }

    toggleCreateNewChallengePopupForm = () => {
        this.setState({
            showPopupForm: !this.state.showPopupForm
        });
    }
    render() {
        let apiChallengeResults = null;
        this.props.currentChallengeData.map((user, index) => {
            apiChallengeResults = user.map((eachUser, index) => {
                return (
                    <tr key={index}>
                        <td>{eachUser.first_name} {eachUser.last_name}</td>
                        <td>{eachUser.commit_percentage}</td>
                        <td>{eachUser.longest_streak}</td>
                        <td>{eachUser.daily_email_reminders.toString()}</td>
                        <td>{eachUser.weekly_email_reminders.toString()}</td>
                        <td><button>Delete</button></td>
                    </tr>
                )
            })
        })

        // add logic for conditional rendering 
        return (
            <main>
                <Header title="Tier Four" />
                <h1>This is the Admin View</h1>

                <button onClick={this.toggleCreateNewChallengePopupForm.bind(this)}>Create New Challenge</button>
                {this.state.showPopupForm ?
                    <CreateNewChallengeForm
                        text='Create a New Challenge'
                        closePopupForm={this.toggleCreateNewChallengePopupForm.bind(this)}
                    />
                    : null
                }
                <button onClick={this.showCurrentChallenge}>Current Challenge</button>
                <button onClick={this.showPastChallenges}>Past Challenges</button>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Commit %</th>
                            <th>Streak</th>
                            <th>Daily Reminder</th>
                            <th>Weekly Reminder</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apiChallengeResults}
                    </tbody>
                </table>


            </main>
        )
    }
}

export default connect(mapStateToProps)(AdminView);
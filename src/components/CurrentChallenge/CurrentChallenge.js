import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
    currentChallengeData: state.challenge.current
});

class CurrentChallenge extends Component {
    render(){
        let apiChallengeResults = null;
        this.props.currentChallengeData.map((user) => {
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
        return (
            <div>
                <p>Current Challenge</p>
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
                <Button>Delete Current Challenge</Button>
            </div>
        )
    }
}

export default connect(mapStateToProps)(CurrentChallenge);
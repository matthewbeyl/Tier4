import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { CHALLENGE_ACTIONS } from '../../redux/actions/challengeActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    currentChallengeData: state.challenge.current,
    currentChallenge: state.challenge.active,
    user: state.user.user,
    login: state.login,
});

class CurrentChallengeTable extends Component {

    componentWillMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: CHALLENGE_ACTIONS.FETCH_ACTIVE_CHALLENGE });
    }

    render(){
        let apiChallengeResults = null;
        this.props.currentChallengeData.map((user) => {
            return (
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
            )
        })

        return(
            <div>
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
            </div>
        )
    }
}

export default connect(mapStateToProps)(CurrentChallengeTable);
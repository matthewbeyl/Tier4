import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';

class CreateNewChallengeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newChallenge: {
                title: '',
                date: new Date(),
                exclude_weekends: false,
                exclude_holidays: false
            }
        }
    }

    handleChange = (event) => {
        this.setState({
            newChallenge: {
                ...this.state.newChallenge, 
                title: event.target.value
            }
        })
    }

    render() {
        return (
            <div style={{ display: 'flex', position: 'fixed', width: '100%', height: '100%', top: '0', left: '0', right: '0', bottom: '0', margin: 'auto', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div style={{ postion: 'absolute', width: '500px', height: '250px', margin: 'auto', backgroundColor: 'white' }}>
                    <p>{this.props.text}</p>
                    <label>Challenge Title</label>
                    <input type="text" placeholder="Title" onChange={this.handleChange}/><br />
                    <label>Start Date</label>
                    <input type="date" /><br />
                    Exclude Weekends: <input type="checkbox" id="exclude_weekends" /><br />
                    Exclude Holidays: <input type="checkbox" id="exclude_holidays" /><br />
                    <button>Create Challenge</button><br />
                    <button onClick={this.props.closePopupForm}>Cancel</button>
                </div>
            </div>
        );
    }
}

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
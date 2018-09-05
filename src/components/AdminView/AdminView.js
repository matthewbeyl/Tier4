import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';

class PopupForm extends React.Component {
    render() {
        return (
            <div style={{ display: 'flex', position: 'fixed', width: '100%', height: '100%', top: '0', left: '0', right: '0', bottom: '0', margin: 'auto', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div style={{ alignContent: 'center', postion: 'absolute', left: '25%', right: '25%', top: '25%', bottom: '25%', margin: 'auto', backgroundColor: 'white' }}>
                    <p>{this.props.text}</p>
                    <form>
                        <label>Challenge Title</label>
                        <input type="text" placeholder="Title" />
                        <label>Start Date</label><br />
                        <input type="date" />
                        <button>Create Challenge</button>
                    </form>
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
                    <PopupForm
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
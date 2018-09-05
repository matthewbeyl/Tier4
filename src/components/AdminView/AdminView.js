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

    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            newChallenge: {
                ...this.state.newChallenge,
                [propertyName]: event.target.value
            }
        })
        console.log(this.state.newChallenge);
    }

    handleChangeForExclusion = (propertyName) => (event) => {
        this.setState({
            newChallenge: {
                ...this.state.newChallenge,
                [propertyName]: event.target.checked
            }
        })
        console.log(this.state.newChallenge);
    }

    handleNewChallengeSubmit = () => {
        console.log(this.state.newChallenge);
        this.props.dispatch({type:'CREATE_NEW_CHALLENGE'})
    }
    
    render() {
        return (
            <div style={{ display: 'flex', position: 'fixed', width: '100%', height: '100%', top: '0', left: '0', right: '0', bottom: '0', margin: 'auto', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div style={{ postion: 'absolute', width: '500px', height: '250px', margin: 'auto', backgroundColor: 'white' }}>
                    
                    
                    <form>
                        <p>{this.props.text}</p>
                        <label>Challenge Title</label>
                        <input
                            required
                            value={this.state.newChallenge.title}
                            type="text"
                            placeholder="Title"
                            onChange={this.handleChangeFor('title')} /><br />
                        <label >Start Date</label>
                        <input
                            required
                            value={this.state.newChallenge.date}
                            type="date"
                            onChange={this.handleChangeFor('date')}
                        /><br />
                        Exclude Weekends:
                    <input
                            // checkbox is not capturing true/false
                            // MYL : fix this bug
                            type="checkbox"
                            // value={this.state.newChallenge.exclude_weekends}
                            onChange={this.handleChangeFor('exclude_weekends')}
                        /><br />
                        Exclude Holidays:
                    <input
                            type="checkbox"
                            // value={this.state.newChallenge.exclude_holidays}
                            onChange={this.handleChangeFor('exclude_holidays')}
                        /><br />
                        <button onClick={this.handleNewChallengeSubmit}>Create Challenge</button><br />
                        <button onClick={this.props.closePopupForm}>Cancel</button>
                    </form>
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
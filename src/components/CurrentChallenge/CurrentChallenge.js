import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import { CHALLENGE_ACTIONS } from '../../redux/actions/challengeActions';

const mapStateToProps = state => ({
    currentChallengeData: state.challenge.current,
    currentChallenge: state.challenge.active
});

class CurrentChallenge extends Component {
    constructor(props){
        super(props);
        this.state = {
            newChallenge: {
                title: '',
                date: new Date(),
                exclude_weekends: false,
                exclude_holidays: false
            },
            activeChallenge: true,
            open: false,
        }
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    openNewChallengeDialog = () => {
        this.setState({
            open: true
        });
    }

    handleCreateNewChallenge = () => {
        this.props.dispatch({ type: CHALLENGE_ACTIONS.CREATE_NEW_CHALLENGE, payload: this.state.newChallenge });
        this.setState({
            open: false
        })
    }

    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            newChallenge: {
                ...this.state.newChallenge,
                [propertyName]: event.target.value
            }
        })
    }

    render(){

        let currentChallengeTitle = this.props.currentChallenge.map((item, index) => {
            return(
                <p key={index}>{item.title}</p>
            )
        })

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

                   {this.state.activeChallenge ?
                    <Button
                        onClick={this.openNewChallengeDialog}
                    >Create New Challenge
                    </Button>
                : null}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>Create a new challenge</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Title"
                            type="text"
                            fullWidth
                            required
                            onChange={this.handleChangeFor('title')}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="date"
                            type="date"
                            fullWidth
                            required
                            onChange={this.handleChangeFor('date')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleCreateNewChallenge}>
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>


                <div>{currentChallengeTitle}</div>
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
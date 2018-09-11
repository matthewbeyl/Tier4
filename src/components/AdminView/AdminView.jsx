import React, { Component } from 'react';
import { connect } from 'react-redux';
// import CreateNewChallengeForm from '../CreateNewChallengeForm/CreateNewChallengeForm.js';
import PastChallenges from '../PastChallenges/PastChallenges';
import CurrentChallenge from '../CurrentChallenge/CurrentChallenge';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { CHALLENGE_ACTIONS } from '../../redux/actions/challengeActions';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import NavBar from '../NavBar/NavBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const mapStateToProps = state => ({
    user: state.user.user,
    login: state.login
});

class AdminView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            displayCurrentChallenge: true,
            displayPastChallenges: false,
            adminName: '',
            newChallenge: {
                title: '',
                date: new Date(),
                exclude_weekends: false,
                exclude_holidays: false
            },
            value: 0,
        }
    }

    componentWillMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: CHALLENGE_ACTIONS.FETCH_ACTIVE_CHALLENGE});
    }

    componentDidUpdate() {
        if (this.props.user === null || !this.props.user.admin) {
            this.props.history.push('/home');
        }
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

    openNewChallengeDialog = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
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

    handleCreateNewChallenge = () => {
        this.props.dispatch({ type: CHALLENGE_ACTIONS.CREATE_NEW_CHALLENGE, payload: this.state.newChallenge });
        this.setState({
            open: false
        })
    }

    handleDisplayChange = (event, value) => {
        this.setState({
            value: value
        })
    }

    render() {
        let content = null;
        const { value } = this.state;
        content = (
            <div>
                <p>Welcome,{this.state.adminName}</p>
                <Tabs
                    indicatorColor="primary"
                    value={value}
                    onChange={this.handleDisplayChange}>
                    <Tab
                        label="Current Challenge"
                        onClick={this.displayCurrentChallenge} />
                    <Tab
                        label="Past Challenges"
                        onClick={this.displayPastChallenges} />
                </Tabs>
                <Button
                    onClick={this.openNewChallengeDialog}
                >Create New Challenge
                </Button>
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
                {this.state.displayPastChallenges ?
                    <PastChallenges /> : null
                }
                {this.state.displayCurrentChallenge ?
                    <CurrentChallenge /> : null
                }
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
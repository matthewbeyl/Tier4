import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import CreateNewChallengeForm from '../CreateNewChallengeForm/CreateNewChallengeForm.js';
import PastChallenges from '../PastChallenges/PastChallenges';
import CurrentChallenge from '../CurrentChallenge/CurrentChallenge';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { CHALLENGE_ACTIONS } from '../../redux/actions/challengeActions';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, DialogContentText } from '@material-ui/core';


const mapStateToProps = state => ({
    user: state.user.user,
    login: state.login,
});

//  Bug: if Admin, and on admin view => refreshing will bring admin back to home

class AdminView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            displayCurrentChallenge: true,
            displayPastChallenges: false,
            adminName: ''
        }
    }

    componentWillMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: CHALLENGE_ACTIONS.FETCH_CURRENT_CHALLENGE });
    }

    componentDidUpdate() {
        if (this.props.user === null || !this.props.user.admin) {
            console.log('user is not an admin')
            this.props.history.push('/home');
        }
    }

    displayCurrentChallenge = () => {
        if (this.state.displayPastChallenges === true) {
            this.setState({
                displayPastChallenges: false
            })
        }
        this.setState({
            displayCurrentChallenge: !this.state.displayCurrentChallenge,
        })
    }

    displayPastChallenges = () => {
        if (this.state.displayCurrentChallenge === true) {
            this.setState({
                displayCurrentChallenge: false
            })
        }
        this.setState({
            displayPastChallenges: !this.state.displayPastChallenges,
        })
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

    render() {
        let content = null;
        content = (
            <div>
                <p>Welcome,{this.state.adminName}</p>



                <Button
                    onClick={this.openNewChallengeDialog}
                >Create New Challenge
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>Create a new challenge:</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Title"
                            type="text"
                            fullWidth
                            required

                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="date"
                            type="date"
                            // label="Start Date"
                            fullWidth
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>
                            Cancel
                    </Button>
                        <Button>
                            Create
                    </Button>
                    </DialogActions>
                </Dialog>



                {/* {this.state.showPopupForm ?
                    <CreateNewChallengeForm
                        text='Create a New Challenge'
                        closePopupForm={this.toggleCreateNewChallengePopupForm}
                    /> : null
                } */}





                <Button
                    style={{ float: "right" }}
                    onClick={this.displayCurrentChallenge}
                >Current Challenge</Button>
                <Button
                    style={{ float: "right" }}
                    onClick={this.displayPastChallenges}
                >Past Challenges</Button>
                {this.state.displayPastChallenges ?
                    <PastChallenges
                    /> : null
                }
                {this.state.displayCurrentChallenge ?
                    <CurrentChallenge
                    /> : null
                }
            </div>
        );
        return (
            <main>
                <Header title="Tier Four" />
                {content}
            </main>
        )
    }
}

export default connect(mapStateToProps)(AdminView);
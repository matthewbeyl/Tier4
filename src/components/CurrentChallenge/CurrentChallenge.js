import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { CHALLENGE_ACTIONS } from '../../redux/actions/challengeActions';
import DeleteCurrentChallengeButton from '../DeleteCurrentChallengeButton/DeleteCurrentChallengeButton';
import CurrentChallengeTable from '../CurrentChallengeTable/CurrentChallengeTable';

const mapStateToProps = state => ({
    currentChallengeData: state.challenge.current,
    currentChallenge: state.challenge.active,
    checkChallengeStatus: state.challenge.active
});

class CurrentChallenge extends Component {
    constructor(props) {
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

    componentWillMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: CHALLENGE_ACTIONS.FETCH_ACTIVE_CHALLENGE });
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

    render() {
        if (this.props.checkChallengeStatus.length === 0){
            console.log('no current challenge');

        } else {
            console.log('active challenge');
        }

        let currentChallengeTitle = this.props.currentChallenge.map((item, index) => {
            return (
                <p key={index}>{item.title}</p>
            )
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
                
                <CurrentChallengeTable />
                <DeleteCurrentChallengeButton />
            </div>
        )
    }
}

export default connect(mapStateToProps)(CurrentChallenge);
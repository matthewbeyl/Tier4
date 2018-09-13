import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFeedback, addPreferences, fetchStats } from '../../redux/actions/dashboardActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import NavBar from '../NavBar/NavBar';
import JoinChallengeButton from '../JoinChallengeButton/JoinChallengeButton'

import { Paper, Button, TextField, Checkbox, Typography, Grid } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
    paper: {
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        height: 500,
        display: "center",
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    isLoading: state.user.isLoading,
    commitRate: state.userStats.commit_percentage,
    longestStreak: state.userStats.longest_streak,
});

class DashboardView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            applied: '',
            learned: '',
            built: '',
            followed_up: '',
            events_networking: '',
            queued_for_next_challenge: false,
            weekly_email_reminders: false,
            daily_email_reminders: false,
            email: '',
            prefopen: false,
        };
    };

    openPreferences = () => {
        console.log('State before', this.state);
        console.log('props.user before', this.props.user);

        this.setState({
            queued_for_next_challenge: this.props.user.queued_for_next_challenge,
            weekly_email_reminders: this.props.user.weekly_email_reminders,
            daily_email_reminders: this.props.user.daily_email_reminders,
            email: this.props.user.email
        });
        console.log('State after', this.state);
        this.setState({
            prefopen: true
        });
    };

    closePreferences = () => {
        this.setState({ prefopen: false });
    };

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        if (!this.props.user && this.props.user === null) {
            this.props.history.push('home');
        }
        this.props.dispatch(fetchStats());
    }

    componentDidUpdate() {
        if (!this.props.isLoading && this.props.user === null) {
            this.props.history.push('home');
        }

    }

    submitFeedback = (event) => {
        event.preventDefault();
        if (this.state.applied !== ''
            && this.state.learned !== ''
            && this.state.built !== ''
            && this.state.followed_up !== ''
            && this.state.events_networking !== '') {
            this.props.dispatch(addFeedback(this.state))
            this.setState({ sumopen: false })
        } else {
            alert('Please complete form before submitting')
        }
    }

    setPreferences = (event) => {
        event.preventDefault();
        if (this.state.email !== '') {
            this.props.dispatch(addPreferences(this.state))
            this.setState({ prefopen: false })
        } else {
            alert('Please enter e-mail address')
        }
    }

    handleCheckboxBoolean = (property) => (event) => {
        if (event.target.checked) {
            this.setState({
                [property]: true
            })
        } else {
            this.setState({
                [property]: false
            })
        }
        console.log(this.state);

    }

    handleEmailInput = (property) => (event) => {
        this.setState({
            [property]: event.target.value
        })
    }

    handleFeedbackChange = (property) => (event) => {
        this.setState({
            [property]: event.target.value
        })
    }

    render() {
        let { classes } = this.props

        return (
            <main>
                <NavBar />
                <br />
                <JoinChallengeButton />
                <br />
                <Grid container>
                    <Grid item sm>
                        <Paper className={classes.paper}>
                            <img src={this.props.user.image_url} alt="" height="200px" width="auto"/>
                            <Typography variant="display3">{this.props.commitRate}% Commit Rate</Typography>
                            <Typography variant="display3">Longest Streak: {this.props.longestStreak}</Typography>
                            {/* <Typography variant="display3">{this.props.longestStreak} Day Streak</Typography> */}

                            <br />
                            <Button onClick={this.openPreferences} variant="outlined" color="primary" size="small">E-mail Preferences</Button>
                        </Paper>
                    </Grid>
                    <Dialog
                        open={this.state.prefopen}
                        onClose={this.closePreferences}
                        aria-labelledby="Preferences Dialog"
                    >
                        <DialogTitle id="Preferences Dialog">Preferences</DialogTitle>
                        <form onSubmit={this.setPreferences}>
                            <DialogContent>
                                <Typography>I would like to receive...</Typography>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.queued_for_next_challenge}
                                            onChange={this.handleCheckboxBoolean('queued_for_next_challenge')}
                                            color="primary"
                                        />
                                    }
                                    label="An e-mail notification for the next challenge"
                                />
                                <br />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.daily_email_reminders}
                                            onChange={this.handleCheckboxBoolean('daily_email_reminders')}
                                            color="primary"
                                        />
                                    }
                                    label="Daily e-mail reminders to commit"
                                />
                                <br />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.weekly_email_reminders}
                                            onChange={this.handleCheckboxBoolean('weekly_email_reminders')}
                                            color="primary"
                                        />
                                    }
                                    label="Weekly e-mail reminders to submit Summary"
                                />
                                <br />
                                <TextField
                                    id="email"
                                    label="E-mail Address"
                                    value={this.state.email}
                                    onChange={this.handleEmailInput('email')}
                                    fullWidth
                                    margin="normal"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.closePreferences} color="primary">
                                    Cancel
                                </Button>
                                <Button type="submit" color="primary">
                                    Update
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>
                    <Grid item sm>
                        <Paper className={classes.paper}>
                            <form onSubmit={this.submitFeedback}>
                                <Typography variant="title">Tell us about your week</Typography>
                                <TextField
                                    id="learned"
                                    label="What did you learn?"
                                    value={this.state.learned}
                                    onChange={this.handleFeedbackChange('learned')}
                                    fullWidth
                                    margin="normal"
                                />
                                <br />
                                <TextField
                                    id="built"
                                    label="What did you build?"
                                    value={this.state.built}
                                    onChange={this.handleFeedbackChange('built')}
                                    fullWidth
                                    margin="normal"
                                />
                                <br />
                                <TextField
                                    id="applied"
                                    label="Where did you apply?"
                                    value={this.state.applied}
                                    onChange={this.handleFeedbackChange('applied')}
                                    fullWidth
                                    margin="normal"
                                />
                                <br />
                                <TextField
                                    id="followed_up"
                                    label="Who did you follow up with?"
                                    value={this.state.followed_up}
                                    onChange={this.handleFeedbackChange('followed_up')}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    id="events_networking"
                                    label="What kind of events/networking did you do?"
                                    value={this.state.events_networking}
                                    onChange={this.handleFeedbackChange('events_networking')}
                                    fullWidth
                                    margin="normal"
                                />
                                <Button variant="outlined" type="submit" color="primary">
                                    Send
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </main>
        )
    }
}

const StyledDashboardView = withStyles(styles)(DashboardView)
export default connect(mapStateToProps)(StyledDashboardView);
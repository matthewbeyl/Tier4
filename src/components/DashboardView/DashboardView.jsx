import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFeedback, addPreferences, fetchStats } from '../../redux/actions/dashboardActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Header from '../Header/Header';
import JoinChallengeButton from '../JoinChallengeButton/JoinChallengeButton'

import { Paper, Button, TextField, Checkbox, Typography, Grid, Snackbar, IconButton } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Cookie from 'universal-cookie';
import swal from 'sweetalert';

const cookie = new Cookie();

const styles = {
    paper: {
        padding: 20,
        marginBottom: 10,
        height: 500,
        display: 'center',
        marginLeft: 10,
        marginRight: 10,
        alignText: 'center',
    },
    prefs: {
        float: 'right',
        marginRight: 10,
    },
    stats: {
        textAlign: 'center',
        contentAlign: 'center',
        marginTop: 100,
    },
    buttonPaper: {
        marginLeft: 10,
        marginRight: 10,
    },
}

//user, longestStreak, commitRate being passed through the redux state from github.  
const mapStateToProps = state => ({
    user: state.user.user,
    isLoading: state.user.isLoading,
    commitRate: state.userStats.commit_percentage,
    longestStreak: state.userStats.longest_streak,
    emailSnackbar: state.snackbar.emailSnackbar,
    feedbackSnackbar: state.snackbar.feedbackSnackbar
});

class DashboardView extends Component {

    constructor(props) {
        super(props);
        this.state = cookie.get('weeklySummary') || {
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
            emailSnackbar: this.props.emailSnackbar,
            feedbackSnackbar: this.props.feedbackSnackbar
        };
    };


    //opening and closing of snackbar/toast notifications
    openSnack = () => {
        this.props.dispatch({ type: 'OPEN_EMAIL_SNACKBAR' })
    }

    handleCloseEmailSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.props.dispatch({ type: 'CLOSE_EMAIL_SNACKBAR' })
    };

    handleCloseFeedbackSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.props.dispatch({ type: 'CLOSE_FEEDBACK_SNACKBAR' })
    };

    //Opens the email preferences dialog form
    openPreferences = () => {
        this.setState({
            queued_for_next_challenge: this.props.user.queued_for_next_challenge,
            weekly_email_reminders: this.props.user.weekly_email_reminders,
            daily_email_reminders: this.props.user.daily_email_reminders,
            email: this.props.user.email
        });
        this.setState({
            prefopen: true
        });
    };

    //closes form
    closePreferences = () => {
        this.setState({ prefopen: false });
    };

    //on mount, verifying the user is registered with github and fetching the users image url, commit streak, and commit percentage
    //if unverified, redirecting to home page
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        if (!this.props.user && this.props.user === null) {
            this.props.history.push('home');
        }
        this.props.dispatch(fetchStats());
    }

    //handling same functionality as above, but for page update
    //setting state for the snackbar/toasts on update
    componentDidUpdate(prevProps) {
        if (!this.props.isLoading && this.props.user.github === null) {
            this.props.history.push('home');
        }
        if (this.props.emailSnackbar !== prevProps.emailSnackbar) {
            this.setState({
                emailSnackbar: this.props.emailSnackbar
            })
        }
        if (this.props.feedbackSnackbar !== prevProps.feedbackSnackbar) {
            this.setState({
                feedbackSnackbar: this.props.feedbackSnackbar
            })
        }
    }

    //collects data from feedback form and submits it to the database
    //clears text fields on submission
    submitFeedback = (event) => {
        event.preventDefault();
        if (this.state.applied !== ''
            && this.state.learned !== ''
            && this.state.built !== ''
            && this.state.followed_up !== ''
            && this.state.events_networking !== '') {
            this.props.dispatch(addFeedback(this.state))
            this.setState({ sumopen: false })
            cookie.remove('weeklySummary')
            this.setState({
                applied: '',
                learned: '',
                built: '',
                followed_up: '',
                events_networking: ''
            })
        } else {
            swal('Please complete form before submitting')
        }
    }

    //collects data from email preferences form and submits it to the database
    setPreferences = (event) => {
        event.preventDefault();
        if (this.state.email !== '') {
            this.props.dispatch(addPreferences(this.state))
            this.setState({ prefopen: false })
        } else {
            swal('Please enter e-mail address')
        }
    }

    //toggles click of checkboxes in email preferences form
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
    }

    //set email state
    handleEmailInput = (property) => (event) => {
        this.setState({
            [property]: event.target.value
        })
    }


    handleFeedbackChange = (property) => (event) => {
        this.setState({
            [property]: event.target.value
        })
        cookie.set('weeklySummary', this.state)
    }

    render() {
        let { classes } = this.props

        return (
            <main className={classes.page}>
                <Header />
                <div>
                    <Paper className={classes.buttonPaper}>
                        <Grid container>
                            <Grid item sm>
                                <JoinChallengeButton />
                            </Grid>
                            <Grid item sm>
                                <Button className={classes.prefs} onClick={this.openPreferences} color="primary" size="small">E-mail Preferences</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.emailSnackbar}
                        variant="success"
                        autoHideDuration={6000}
                        onClose={this.handleCloseEmailSnack}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">Email preferences updated</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={this.handleCloseEmailSnack}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.feedbackSnackbar}
                        variant="success"
                        autoHideDuration={6000}
                        onClose={this.handleCloseFeedbackSnack}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">Weekly Summary Submitted</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={this.handleCloseFeedbackSnack}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                    <br />
                    <Grid container>

                        {/* user stats */}
                        <Grid item sm>
                            <Paper className={classes.paper}>
                                <div className={classes.stats}>
                                    <img src={this.props.user.image_url} alt="" height="200px" width="auto" />
                                    <Typography variant="display1">{this.props.commitRate}% Commit Rate</Typography>
                                    <Typography variant="display1">Longest Streak: {this.props.longestStreak}</Typography>
                                </div>
                            </Paper>
                        </Grid>

                        {/* email preferences dialog */}
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

                        {/* weekly summary/feedback form */}
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
                    <br />
                </div>
            </main>
        )
    }
}

const StyledDashboardView = withStyles(styles)(DashboardView)
export default connect(mapStateToProps)(StyledDashboardView);
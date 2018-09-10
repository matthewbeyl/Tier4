import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFeedback } from '../../redux/actions/dashboardActions';
import { addPreferences } from '../../redux/actions/dashboardActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import NavBar from '../NavBar/NavBar';

import { Paper, Grid, Button, TextField, Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const mapStateToProps = state => ({
    user: state.user.user,
    isLoading: state.user.isLoading
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
        };
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        
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
        } else {
            alert('Please complete form before submitting')
        }
    }

    setPreferences = (event) => {
        event.preventDefault();
        if (this.state.email !== '') {
            this.props.dispatch(addPreferences(this.state))
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

        return (
            <main>
                <NavBar />
                <Button variant="outlined" color="primary">Join Challenge</Button>

                <Grid container>
                    <Grid item sm>
                        <Paper>
                            <form onSubmit={this.setPreferences}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.queued_for_next_challenge}
                                            onChange={this.handleCheckboxBoolean('queued_for_next_challenge')}
                                            value="challenge"
                                            color="primary"
                                        />
                                    }
                                    label="I would like to receive an e-mail notification fo the next challenge"
                                />
                                <br />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.daily_email_reminders}
                                            onChange={this.handleCheckboxBoolean('daily_email_reminders')}
                                            value="commit"
                                            color="primary"
                                        />
                                    }
                                    label="I would like to receive daily e-mail reminders to commit"
                                />
                                <br />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.weekly_email_reminders}
                                            onChange={this.handleCheckboxBoolean('weekly_email_reminders')}
                                            value="feedback"
                                            color="primary"
                                        />
                                    }
                                    label="I would like to receive weekly e-mail reminders to submit feedback"
                                />
                                <TextField
                                    id="email"
                                    label="E-mail Address"
                                    value={this.state.email}
                                    onChange={this.handleEmailInput('email')}
                                    margin="normal"
                                />
                                <Button type="submit" variant="outlined" color="primary">Update Preferences</Button>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item sm>
                        <Paper>
                            <form onSubmit={this.submitFeedback}>
                                <TextField
                                    id="learned"
                                    label="What did you learn?"
                                    value={this.state.learned}
                                    onChange={this.handleFeedbackChange('learned')}
                                    margin="normal"
                                />
                                <br />
                                <TextField
                                    id="built"
                                    label="What did you build?"
                                    value={this.state.built}
                                    onChange={this.handleFeedbackChange('built')}
                                    margin="normal"
                                />
                                <br />
                                <TextField
                                    id="applied"
                                    label="Where did you apply?"
                                    value={this.state.applied}
                                    onChange={this.handleFeedbackChange('applied')}
                                    margin="normal"
                                />
                                <br />
                                <TextField
                                    id="followed_up"
                                    label="Who did you follow up with?"
                                    value={this.state.followed_up}
                                    onChange={this.handleFeedbackChange('followed_up')}
                                    margin="normal"
                                />
                                <br />
                                <TextField
                                    id="events_networking"
                                    label="What kind of events/networking did you do?"
                                    value={this.state.events_networking}
                                    onChange={this.handleFeedbackChange('events_networking')}
                                    margin="normal"
                                />
                                <br />
                                <Button type="submit" variant="outlined" color="primary">Submit Feedback</Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </main>
        )
    }
}

export default connect(mapStateToProps)(DashboardView);
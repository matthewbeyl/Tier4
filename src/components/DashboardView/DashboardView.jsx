import React, { Component } from 'react';
import Header from '../Header/Header';
import { connect } from 'react-redux';
import { addFeedback } from '../../redux/actions/dashboardActions';
import { addPreferences } from '../../redux/actions/dashboardActions';

class DashboardView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            applied: '',
            learned: '',
            built: '',
            followed_up: '',
            events_networking: '',
        },
            {
                queued_for_next_challenge: false,
                weekly_email_reminders: false,
                daily_email_reminders: false,
                email: '',
            };
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
                <Header title="Tier Four" />
                <h3>Welcome, User</h3>
                <form onSubmit={this.submitFeedback}>
                    <label>What did you learn?</label>
                    <input type="text" placeholder="I learned..." value={this.state.learned} onChange={this.handleFeedbackChange('learned')} />
                    <br />
                    <label>What did you build?</label>
                    <input type="text" placeholder="I built..." value={this.state.built} onChange={this.handleFeedbackChange('built')} />
                    <br />
                    <label>Where did you apply?</label>
                    <input type="text" placeholder="I applied..." value={this.state.applied} onChange={this.handleFeedbackChange('applied')} />
                    <br />
                    <label>Who did you follow up with?</label>
                    <input type="text" placeholder="I followed up..." value={this.state.followed_up} onChange={this.handleFeedbackChange('followed_up')} />
                    <br />
                    <label>What kind of events/networking did you do?</label>
                    <input type="text" placeholder="I attended..." value={this.state.events_networking} onChange={this.handleFeedbackChange('events_networking')} />
                    <br />
                    <button type="submit">Submit Feedback</button>
                </form>
                <br />
                <button>Join Challenge</button>
                <br />
                <form onSubmit={this.setPreferences}>
                    <input type="checkbox"
                        name="challenge"
                        onChange={this.handleCheckboxBoolean('queued_for_next_challenge')}
                        checked={this.state.queued_for_next_challenge} />I would like e-mail notification for the next challenge<br />
                    <input type="checkbox"
                        name="commit"
                        onChange={this.handleCheckboxBoolean('daily_email_reminders')}
                        checked={this.state.daily_email_reminders} />I would like daily e-mail reminders to commit<br />
                    <input type="checkbox"
                        name="feedback"
                        onChange={this.handleCheckboxBoolean('weekly_email_reminders')}
                        checked={this.state.weekly_email_reminders} />I would like weekly e-mail reminders to commit<br />
                    <label>E-mail Address</label>
                    <input type="text" placeholder="email@email.com" value={this.state.email} onChange={this.handleEmailInput('email')} />
                    <button type="submit">Update Preferences</button>
                </form>
            </main>
        )
    }
}

export default connect()(DashboardView);
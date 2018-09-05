import React, { Component } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import { connect } from 'react-redux';
import { addFeedback } from '../../redux/actions/feedbackActions';

class DashboardView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            applied: '',
            learned: '',
            built: '',
            followed_up: '',
            events_networking: '',
        };
    }


    submitFeedback = (event) => {
        event.preventDefault();
        console.log('Submit clicked, good job!');
        console.log(this.state);
        
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

    handleChangeFor = (property) => (event) => {
        console.log(property);
        
        this.setState({
            [property] : event.target.value
        })
    }

    render() {
        return (
            <main>
                <Header title="Tier Four" />
                <h3>Welcome, User</h3>
                <form onSubmit={this.submitFeedback}>
                    <label>What did you learn?</label>
                    <input type="text" placeholder="I learned..." value={this.state.applied} onChange={this.handleChangeFor('applied')}/>
                    <br />
                    <label>What did you build?</label>
                    <input type="text" placeholder="I built..." value={this.state.learned}  onChange={this.handleChangeFor('learned')}/>
                    <br />
                    <label>Where did you apply?</label>
                    <input type="text" placeholder="I applied..." value={this.state.built}  onChange={this.handleChangeFor('built')}/>
                    <br />
                    <label>Who did you follow up with?</label>
                    <input type="text" placeholder="I followed up..." value={this.state.followed_up}  onChange={this.handleChangeFor('followed_up')}/>
                    <br />
                    <label>What kind of events/networking did you do?</label>
                    <input type="text" placeholder="I..." value={this.state.events_networking}  onChange={this.handleChangeFor('events_networking')}/>
                    <br />
                    <button type="submit">Submit Feedback</button>
                </form>
            </main>
        )
    }
}

export default connect() (DashboardView);
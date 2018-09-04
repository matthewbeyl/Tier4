import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';

class DashbaordView extends Component {

    

    submitFeedback = (event) => {
        console.log('Submit clicked, good job!');
    }

    render() {
        return (
            <main>
                <NavBar />
                <h3>Welcome, User</h3>
                <form onSubmit={this.submitFeedback}>
                    <label>What did you learn?</label>
                    <input type="text" placeholder="I learned..."></input>
                    <br/>
                    <label>What did you build?</label>
                    <input type="text" placeholder="I built..."></input>
                    <br/>
                    <label>Where did you apply?</label>
                    <input type="text" placeholder="I applied..."></input>
                    <br/>
                    <label>Who did you follow up with?</label>
                    <input type="text" placeholder="I followed up..."></input>
                    <br/>
                    <label>What kind of events/networking did you do?</label>
                    <input type="text" placeholder="I..."></input>
                    <br/>
                    <button type="submit">Submit Feedback</button>
                </form>
            </main>
        )
    }
}

export default DashbaordView;
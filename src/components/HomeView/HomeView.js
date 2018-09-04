import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';

class HomeView extends Component {
    render() {
        return (
            <main>
                <NavBar />
                <h1>This is the Home View</h1>
                <p>
                    Tier Four is the next step in your career as a Full Stack Developer.
                    Code challenges will be initiated periodically by the Prime Digital Academy staff, 
                    to encourage you to continue committing code once you are out of the classroom.

                    The goal?
                    Achieve and maintain the highest daily commit rate that you can, and ear your spot on the leaderboard!
                </p>
            </main>
        )
    }
}

export default HomeView;
import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';

class HomeView extends Component {
    render() {
        return (
            <main>
                <NavBar />
                <h1>This is the Home View</h1>
            </main>
        )
    }
}

export default HomeView;
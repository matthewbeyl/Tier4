import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';

class DashboardView extends Component {
    render() {
        return (
            <main>
                <NavBar />
                <h1>This is the Dashbaord View</h1>
            </main>
        )
    }
}

export default DashboardView;
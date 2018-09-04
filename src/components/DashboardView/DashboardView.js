import React, { Component } from 'react';
import Header from '../Header/Header.js';

class DashboardView extends Component {
    render() {
        return (
            <main>
                <Header />
                <h1>This is the Dashboard View</h1>
            </main>
        )
    }
}

export default DashboardView;
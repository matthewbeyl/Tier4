import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import TestComponent from '../TestComponent/TestComponent'

class DashbaordView extends Component {
    render() {
        return (
            <main>
                <NavBar />
                <TestComponent />
                <h1>This is the Dashbaord View</h1>
            </main>
        )
    }
}

export default DashbaordView;
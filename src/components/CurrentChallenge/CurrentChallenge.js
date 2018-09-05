import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    currentChallengeData: state.challenge.current
});

class CurrentChallenge extends Component {
    render(){
        return (
            <h1>Current Challenge</h1>
        )
    }
}

export default connect(mapStateToProps)(CurrentChallenge);
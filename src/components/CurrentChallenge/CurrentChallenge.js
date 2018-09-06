import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    currentChallengeData: state.challenge.current
});

class CurrentChallenge extends Component {
    render(){
        return (
            <div>
                <p>Current Challenge</p>
                <button>Delete Current Challenge</button>
            </div>
        )
    }
}

export default connect(mapStateToProps)(CurrentChallenge);
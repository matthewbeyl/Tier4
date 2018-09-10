import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
    currentChallengeData: state.challenge.current
});

class CurrentChallenge extends Component {
    render(){
        return (
            <div>
                <p>Current Challenge</p>
                <Button>Delete Current Challenge</Button>
            </div>
        )
    }
}

export default connect(mapStateToProps)(CurrentChallenge);
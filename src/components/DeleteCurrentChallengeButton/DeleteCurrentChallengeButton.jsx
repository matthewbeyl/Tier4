import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { CHALLENGE_ACTIONS } from '../../redux/actions/challengeActions';

class DeleteCurrentChallengeButton extends Component {
    handleDelete = () => {
        console.log('delete clicked');
        this.props.dispatch({ type: CHALLENGE_ACTIONS.DELETE_ACTIVE_CHALLENGE });
    }
    
    render(){
        return(
            <div>
                <Button onClick={this.handleDelete}>Delete Current Challenge</Button>
            </div>
        )
    }
}

export default connect()(DeleteCurrentChallengeButton);
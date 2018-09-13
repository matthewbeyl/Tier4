import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { CHALLENGE_ACTIONS } from '../../redux/actions/challengeActions';
import DeleteIcon from '@material-ui/icons/Delete';

class DeleteCurrentChallengeButton extends Component {
    handleDelete = () => {
        this.props.dispatch({ 
            type: CHALLENGE_ACTIONS.DELETE_ACTIVE_CHALLENGE 
        });
    }
    
    render(){
        return(
            <div>
                <Button 
                    variant="outlined"
                    color="primary"
                    onClick={this.handleDelete}>
                    <DeleteIcon />
                    <div style={{paddingLeft:"10px"}}>
                    Delete Current Challenge</div>
                </Button>
            </div>
        )
    }
}

export default connect()(DeleteCurrentChallengeButton);
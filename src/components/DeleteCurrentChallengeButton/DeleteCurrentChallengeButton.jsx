import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { CHALLENGE_ACTIONS } from '../../redux/actions/challengeActions';
import DeleteIcon from '@material-ui/icons/Delete';
import swal from 'sweetalert';

class DeleteCurrentChallengeButton extends Component {
    handleDelete = () => {
        swal({
            title: 'Are you sure?',
            text: 'Once deleted, this challenge will be completely gone.',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal('The challenge has been deleted.', {
                        icon: 'success',
                    });
                    this.props.dispatch({
                        type: CHALLENGE_ACTIONS.DELETE_ACTIVE_CHALLENGE
                    });
                } else {
                    swal('The challenge has not been deleted.');
                }
            });

    }

    render() {
        return (
            <div>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.handleDelete}>
                    <DeleteIcon />
                    <div style={{ paddingLeft: "10px" }}>
                        Delete Current Challenge</div>
                </Button>
            </div>
        )
    }
}

export default connect()(DeleteCurrentChallengeButton);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { CHALLENGE_ACTIONS } from '../../redux/actions/challengeActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import CurrentChallengeTableWithSort from '../CurrentChallengeTableWithSort/CurrentChallengeTableWithSort';
import swal from 'sweetalert'

const mapStateToProps = state => ({
    currentChallengeUserData: state.challenge.current,
    currentChallenge: state.challenge.active,
    user: state.user.user,
    login: state.login,
    activeChallenge: state.challenge.active
});

class CurrentChallengeTable extends Component {
    componentWillMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: CHALLENGE_ACTIONS.FETCH_ACTIVE_CHALLENGE });
        this.props.dispatch({ type: CHALLENGE_ACTIONS.FETCH_USER_DATA_CURRENT_CHALLENGE });
    }

    handleDeleteUserFromCurrentChallenge = (userId, challengeId) => {
        swal({
            title: "Are you sure?",
            text: "This user will no longer be in this challenge.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("This user has been removed.", {
                icon: "success",
              });
              this.props.dispatch({ 
                type: CHALLENGE_ACTIONS.DELETE_USER_FROM_CURRENT_CHALLENGE, 
                payload: userId, 
                additionalPayload: challengeId 
            })
            } else {
              swal("This user has not been removed.");
            }
          });
    }

    render() {
        let apiChallengeResults = this.props.currentChallengeUserData.map(user => {
            return (
                <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.commit_percentage}</TableCell>
                    <TableCell>{user.streak}</TableCell>
                    <TableCell>{user.daily_reminder.toString()}</TableCell>
                    <TableCell>{user.weekly_reminder.toString()}</TableCell>
                    <TableCell>
                        <Button 
                            onClick={()=>{this.handleDeleteUserFromCurrentChallenge(user.id,user.challenge_id)}}>
                           <div style={{paddingRight: "10px"}}>Delete</div>
                            <DeleteIcon />
                        </Button>
                    </TableCell>
                </TableRow>
            )
        });

        return (
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell numeric>Commit %</TableCell>
                            <TableCell numeric>Streak</TableCell>
                            <TableCell>Daily Reminder</TableCell>
                            <TableCell>Weekly Reminder</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {apiChallengeResults}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default connect(mapStateToProps)(CurrentChallengeTable);
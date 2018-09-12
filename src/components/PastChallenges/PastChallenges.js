import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { CHALLENGE_ACTIONS } from '../../redux/actions/challengeActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const mapStateToProps = state => ({
    activeChallenges : state.challenge.past
});

class PastChallenges extends Component {

    componentWillMount() {
        this.props.dispatch({ type: CHALLENGE_ACTIONS.FETCH_PAST_CHALLENGES});
        this.props.dispatch({
            type: USER_ACTIONS.FETCH_USER
        })
    }

    render() {

        let apiChallengeResults = this.props.activeChallenges.map((user, index) => {
            return (
                <TableRow key={index}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.title}</TableCell>
                    <TableCell>{user.commit_percentage}</TableCell>
                    <TableCell>{user.longest_streak}</TableCell>
                </TableRow>
            )
        });

        return (
            <div>
                <p>Past Challenges</p>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Challenge</TableCell>
                            <TableCell>Commit %</TableCell>
                            <TableCell>Streak</TableCell>
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

export default connect(mapStateToProps)(PastChallenges);
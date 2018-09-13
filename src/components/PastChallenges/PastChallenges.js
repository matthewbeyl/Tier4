import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { CHALLENGE_ACTIONS } from '../../redux/actions/challengeActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

const mapStateToProps = state => ({
    activeChallenges: state.challenge.past
});

class PastChallenges extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowsPerPage: 5,
            page: 0,
        }
    }
    componentWillMount() {
        this.props.dispatch({ type: CHALLENGE_ACTIONS.FETCH_PAST_CHALLENGES });
        this.props.dispatch({
            type: USER_ACTIONS.FETCH_USER
        })
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    }

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: event.target.value });
    }

    render() {
        let apiChallengeResults = this.props.activeChallenges.map((user, index) => {
            return (
                <TableRow hover
                    key={index}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.title}</TableCell>
                    <TableCell numeric>{user.commit_percentage}</TableCell>
                    <TableCell numeric>{user.longest_streak}</TableCell>
                </TableRow>
            )
        });

        const { rowsPerPage, page } = this.state;

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
                <TablePagination
                    component="div"
                    count={apiChallengeResults.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div>
        )
    }
}


export default connect(mapStateToProps)(PastChallenges);
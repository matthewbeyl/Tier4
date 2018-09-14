import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import CurrentChallengeTable from '../CurrentChallengeTable/CurrentChallengeTable';
import { CHALLENGE_ACTIONS } from '../../redux/actions/challengeActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    currentChallengeUserData: state.challenge.current,
});

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    { id: 'name', numeric: false, label: 'Name' },
    { id: 'commit_percentage', numeric: false, label: 'Commit Percentage'},
    { id: 'streak', numeric: true, label: 'Longest Streak' },
    { id: 'daily_reminder', numeric: false, label: 'Daily Reminder' },
    { id: 'weekly_reminder', numeric: false, label: 'Weekly Reminder' },
];

class EnhancedTableHead extends Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy } = this.props;
        return (
            <TableHead>
                <TableRow>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                sortDirection={orderBy === row.id ? order : false}>
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}>
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}>
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

class CurrentChallengeTableWithSort extends Component {
    state = {
        order: 'asc',
        orderBy: '',
        selected: [],
        data: [],
        page: 0,
        rowsPerPage: 5,
    };

    componentWillMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: CHALLENGE_ACTIONS.FETCH_ACTIVE_CHALLENGE });
        this.props.dispatch({ type: CHALLENGE_ACTIONS.FETCH_USER_DATA_CURRENT_CHALLENGE });
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {
        let apiChallengeResults = this.props.currentChallengeUserData.map((user, index) => {
            return (
                <TableRow hover
                    key={index}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.commit_percentage}</TableCell>
                    <TableCell>{user.streak}</TableCell>
                    <TableCell>{user.daily_reminder.toString()}</TableCell>
                    <TableCell>{user.weekly_reminder.toString()}</TableCell>
                </TableRow>
            )
        });

        const { order, orderBy, selected, rowsPerPage, page } = this.state;
        return (
            <div>
                <div>
                    <Table>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={apiChallengeResults.length}
                        />
                        <TableBody>
                            {stableSort(this.props.currentChallengeUserData, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(user => {
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, user.id)}
                                            key={user.id}>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell >{user.commit_percentage}</TableCell>
                                            <TableCell numeric>{user.streak}</TableCell>
                                            <TableCell numeric>{user.daily_reminder.toString()}</TableCell>
                                            <TableCell numeric>{user.weekly_reminder.toString()}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    count={this.props.currentChallengeUserData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div>
        );
    }
}

CurrentChallengeTableWithSort.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles()(CurrentChallengeTableWithSort));
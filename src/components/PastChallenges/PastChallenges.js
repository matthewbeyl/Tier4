import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    
});

class PastChallenges extends Component {

    componentWillMount() {
        this.props.dispatch({
            type: USER_ACTIONS.FETCH_USER
        })
    }

    render() {
        
        return (
            <div>
                <p>Past Challenges</p>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Challenge</th>
                            <th>Commit %</th>
                            <th>Streak</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(mapStateToProps)(PastChallenges);
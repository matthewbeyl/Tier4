import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import CreateNewChallengeForm from '../CreateNewChallengeForm/CreateNewChallengeForm.js';
import PastChallenges from '../PastChallenges/PastChallenges';
import CurrentChallenge from '../CurrentChallenge/CurrentChallenge';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    user: state.user.user,
    login: state.login,
});
//  Bug: if Admin, and on admin view => refreshing will bring admin back to home
class AdminView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopupForm: false,
            displayCurrentChallenge: true,
            displayPastChallenges: false
        }
    }

    componentWillMount() {
        this.props.dispatch({
            type: USER_ACTIONS.FETCH_USER
        })

        // user who are not logged will directed to the home view
        if (!this.props.user) {
            this.props.history.push('/home');
        }
    }

    componentDidUpdate() {
        console.log(this.props.user.admin)
        this.props.dispatch({ type: 'FETCH_CURRENT_CHALLENGE' });

        // user who are logged in and are not Admin will be directed to the home view
        if (!this.props.user.admin || this.props.user.admin === null) {
            console.log('user is not an admin')
            this.props.history.push('/home');
        }
    }

    displayCurrentChallenge = () => {
        if (this.state.displayPastChallenges === true) {
            this.setState({
                displayPastChallenges: false
            })
        }
        this.setState({
            displayCurrentChallenge: !this.state.displayCurrentChallenge,
        })
    }

    displayPastChallenges = () => {
        if (this.state.displayCurrentChallenge === true) {
            this.setState({
                displayCurrentChallenge: false
            })
        }
        this.setState({
            displayPastChallenges: !this.state.displayPastChallenges,
        })
    }

    toggleCreateNewChallengePopupForm = () => {
        this.setState({
            showPopupForm: !this.state.showPopupForm
        });
    }

    render() {
        let content = null;
        content = (
            <div>
                <p>Welcome, Luke</p>
                <button onClick={this.toggleCreateNewChallengePopupForm.bind(this)}>Create New Challenge</button>
                {this.state.showPopupForm ?
                    <CreateNewChallengeForm
                        text='Create a New Challenge'
                        closePopupForm={this.toggleCreateNewChallengePopupForm.bind(this)}
                    /> : null
                }
                <button
                    style={{ float: "right" }}
                    onClick={this.displayCurrentChallenge}
                >Current Challenge</button>
                <button
                    style={{ float: "right" }}
                    onClick={this.displayPastChallenges}
                >Past Challenges</button>
                {/* displays when past challenge state variable is true */}
                {this.state.displayPastChallenges ?
                    <PastChallenges
                    /> : null
                }
                {/* displays when curent challenges state variable is true */}
                {this.state.displayCurrentChallenge ?
                    <CurrentChallenge
                    /> : null
                }
            </div>
        );
        return (
            <main>
                <Header title="Tier Four" />
                {content}
            </main>
        )
    }
}

export default connect(mapStateToProps)(AdminView);
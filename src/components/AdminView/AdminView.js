import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import CreateNewChallengeForm from '../CreateNewChallengeForm/CreateNewChallengeForm.js';
import PastChallenges from '../PastChallenges/PastChallenges';

const mapStateToProps = state => ({
    user: state.user,
    login: state.login,
});

class AdminView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopupForm: false,
            toggleDisplayTable: false
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_CURRENT_CHALLENGE' });
    }

    toggleDisplayTableTrue = () => {
        console.log('show current challenge');
        this.setState({
            toggleDisplayTable: true
        })
        console.log(this.state.toggleDisplayTable);
    }

    toggleDisplayTableFalse = () => {
        console.log('show past challenges');
        this.setState({
            toggleDisplayTable: false
        })
        console.log(this.state.toggleDisplayTable);
    }

    toggleCreateNewChallengePopupForm = () => {
        this.setState({
            showPopupForm: !this.state.showPopupForm
        });
    }

    render() {
        return (
            <main>
                <Header title="Tier Four" />
                <h1>This is the Admin View</h1>
                <button onClick={this.toggleCreateNewChallengePopupForm.bind(this)}>Create New Challenge</button>
                {this.state.showPopupForm ?
                    <CreateNewChallengeForm
                        text='Create a New Challenge'
                        closePopupForm={this.toggleCreateNewChallengePopupForm.bind(this)}
                    />: null
                }
                <button onClick={this.toggleDisplayTableTrue}>Current Challenge</button>
                <button onClick={this.toggleDisplayTableFalse}>Past Challenges</button>
                {this.state.toggleDisplayTable ?
                <PastChallenges 
                />: null 
                }
            </main>
        )
    }
}

export default connect(mapStateToProps)(AdminView);
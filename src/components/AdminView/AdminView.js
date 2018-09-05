import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';

const mapStateToProps = state => ({
    user: state.user,
    login: state.login,
    currentChallengeData: state.challenge.current
});

class AdminView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '',
        }
    }
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_CURRENT_CHALLENGE' });
    }

    render() {
        let apiChallengeResults = null;
        // map over mapStateToProps state here for user data
        this.props.currentChallengeData.map((user, index) => {
            apiChallengeResults = user.map((eachUser, index) => {
                return(
                    <div key={index}>
                        {eachUser.first_name} {eachUser.last_name}
                    </div>
                )
            })
        })

        // add logic for conditional rendering 
        return (
            <main>
                <Header title="Tier Four" />
                <h1>This is the Admin View</h1>
                {/* display button for admin to make new challenge, 
                render conditionally*/}
                <section>
                    <button>Create New Challenge</button>
                </section>
                {/* always viewable, two buttons that changes which table to show */}
                <section>
                    <button>Current Challenge</button>
                    <button>Past Challenges</button>
                </section>

                {apiChallengeResults}
            </main>
        )
    }
}

export default connect(mapStateToProps)(AdminView);
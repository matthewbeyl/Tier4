import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStartDate } from '../../redux/actions/homeActions';
import axios from 'axios';
import swal from 'sweetalert';

import { CHALLENGE_ACTIONS } from '../../redux/actions/challengeActions';

import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const mapStateToProps = state => ({
    user: state.user.user,
    isLoading: state.user.isLoading,
    challenge: state.challenge
});

const styles = {
    joinChallenge: {
    }
}

class JoinChallengeButton extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        this.props.dispatch(fetchStartDate());
        this.props.dispatch({ type: CHALLENGE_ACTIONS.CHECK_FOR_UPCOMING_CHALLENGE });
        this.props.dispatch({ type: CHALLENGE_ACTIONS.CHECK_USER_IN_UPCOMING_CHALLENGE });
    }

    joinChallenge = () => {
        swal({
            title: "Confirm Join?",
            buttons: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Welcome to the Challenge", {
                        icon: "success",
                    });
                    axios.post('/api/challenge/join').then(response => {
                        this.props.dispatch({ type: CHALLENGE_ACTIONS.CHECK_FOR_UPCOMING_CHALLENGE });
                        this.props.dispatch({ type: CHALLENGE_ACTIONS.CHECK_USER_IN_UPCOMING_CHALLENGE });
                    }).catch(err => {
                        console.log(err);
                        swal('Whoops! There was an error joining this challenge.')
                    })
                } else {
                    swal("We're sorry to see you change your mind. :(");
                }
            });

    }

    render() {

        let { classes } = this.props

        let button;

        // try{
            if (this.props.challenge.userInUpcomingChallenge.length === 1){
                button = <Button color="primary" disabled>Challenge Joined</Button>
            } else if (this.props.challenge.upcoming.length === 0) {
                button = <Button color="primary" disabled>No Upcoming Challenge</Button>
            }else if (this.props.challenge.upcoming.length === 1 && this.props.challenge.userInUpcomingChallenge.length === 0) {
                button = <Button variant="contained" color="primary" onClick={this.joinChallenge}>Join Challenge</Button>
            }
             else{                
            }

        return (
            <div className={classes.joinChallenge}>
                {button}
            </div>
        )
    }
}

const StyledJoinChallengeButton = withStyles(styles)(JoinChallengeButton)
export default connect(mapStateToProps)(StyledJoinChallengeButton);
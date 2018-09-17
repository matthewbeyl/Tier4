import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFeedback } from '../../redux/actions/dashboardActions';
import { addPreferences } from '../../redux/actions/dashboardActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import NavBar from '../NavBar/NavBar';
import { fetchStartDate } from '../../redux/actions/homeActions';
import axios from 'axios';
import swal from 'sweetalert';

import { CHALLENGE_ACTIONS } from '../../redux/actions/challengeActions';

import { Paper, Grid, Button, TextField, Checkbox, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const mapStateToProps = state => ({
    user: state.user.user,
    isLoading: state.user.isLoading,
    challenge: state.challenge
});

const styles = {
    joinChallenge: {
        marginLeft: 10,
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
        console.log('Upcoming challenge?:', this.props.challenge.upcoming.length);

        console.log('Are they in the challenge already?:', this.props.challenge.userInUpcomingChallenge.length);
        // try{
            if (this.props.challenge.userInUpcomingChallenge.length === 1){
                console.log('THERE SHOULD NOT NOT NOT BE A BUTTON');
                button = <Button variant="contained" color="#ffffff" disabled>Challenge Joined</Button>
            } else if (this.props.challenge.upcoming.length === 0) {
                console.log('THERE SHOULD NOT NOT NOT BE A BUTTON');
                button = <Button variant="contained" color="#ffffff">No Upcoming Challenge</Button>
            }else if (this.props.challenge.upcoming.length === 1 && this.props.challenge.userInUpcomingChallenge.length === 0) {
                console.log('THERE SHOULD BE A BUTTON');
                button = <Button variant="contained" color="primary" onClick={this.joinChallenge}>Join Challenge</Button>
            }
             else{
                console.log('NOT TRUE');
                
            }
        // } catch (error){
        //     console.log('Whoops');

        // }

        return (
            <div className={classes.joinChallenge}>
                {button}
                {/* <Button disabled>Join Challenge</Button> */}
                {/* <Button disabled>You have already joined the upcoming challenge</Button> */}
                {/* <Button disabled>There is currently no challenge to join</Button> */}
            </div>
        )
    }
}

const StyledJoinChallengeButton = withStyles(styles)(JoinChallengeButton)
export default connect(mapStateToProps)(StyledJoinChallengeButton);
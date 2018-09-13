import React, { Component } from 'react';
import { connect } from 'react-redux';

import Countdown from '../Countdown/Countdown';
import NavBar from '../NavBar/NavBar';

import { fetchStartDate, fetchLeaders } from '../../redux/actions/homeActions';
import LOGIN_ACTIONS from '../../redux/actions/loginActions'
import { USER_ACTIONS } from '../../redux/actions/userActions';

import { Typography, withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
    cardDiv: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: "6%"
    },
    leaderCard: {
        margin: "1% 1% 1% 1%",
    }
}

const mapStateToProps = state => ({
    startDate: state.challengeDate.date,
    user: state.user.user,
    leaders: state.leaderboard,
});

class HomeView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            challengeDate: ''
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchStartDate()); 
        this.props.dispatch(fetchLeaders());
    }

    componentWillMount() {
        this.props.dispatch({
            type: USER_ACTIONS.FETCH_USER
        })
    }

    login = () => {
        this.props.dispatch({type: LOGIN_ACTIONS.LOGIN})
    }

    handleInputChange = (event) => {
        this.setState({
            challegeDate: event.target.value
        })
    }

    reqDotUser = () => {
        console.log('from REDUX, USER:', this.props.user);
        
    }

    render() {
        let { classes } = this.props
        console.log(this.props.leaders);
        
        const leaderCards = this.props.leaders.map((leader, index) => {
            return(<Card className={classes.leaderCard}>
                    <img src={leader.image_url} alt={leader.name} height="200px" width="auto"/>
                    <CardContent>
                        <Typography variant="title" key={index}>
                            {leader.name}
                        </Typography>
                        <Typography variant="subheading">
                            {leader.commit_percentage}% commit rate
                            <br/>
                            longest streak - {leader.longest_streak}
                        </Typography>
                    </CardContent>
            </Card>)
        })
        return (
            <main>
                <NavBar />
                <button onClick={this.reqDotUser}>Log req.user</button>
                <br />
                <Countdown deadline={this.props.startDate}/>
                <Typography variant="display1">Leaderboard</Typography>
                <div className={classes.cardDiv}>
                    {leaderCards}
                </div>
            </main >
        )
    }
}


const StyledHomeView = withStyles(styles)(HomeView)
export default connect(mapStateToProps)(StyledHomeView);
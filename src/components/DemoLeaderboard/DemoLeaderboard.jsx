import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const styles = {
    card: {
        display: 'flex',
        backgroundColor: '#07AA9E',
        minWidth: '100%',
        minHeight: 200,
        overflowX: 'auto',
    },
    cardContent: {
        // backgroundColor: '#e74c3c',
        minWidth: 200,
        margin: 5,
    },
}


class DemoLeaderboard extends Component {
    render() {

        let { classes } = this.props

        return (
            <section className={classes.card}>
                <div class={classes.cardContent}>
                    <img src="https://avatars0.githubusercontent.com/u/33614300?s=460&v=4" height="200px" width="auto" alt=""/>
                </div>
                <div class={classes.cardContent}>
                    <img src="https://avatars1.githubusercontent.com/u/37989980?s=460&v=4" height="200px" width="auto" alt=""/>
                </div>
                <div class={classes.cardContent}>
                    <img src="https://avatars3.githubusercontent.com/u/37785558?s=460&v=4" height="200px" width="auto" alt=""/>
                </div>
                <div class={classes.cardContent}>
                    <img src="https://avatars0.githubusercontent.com/u/36970715?s=460&v=4" height="200px" width="auto" alt=""/>
                </div>
                <div class={classes.cardContent}>
                    <img src="https://avatars0.githubusercontent.com/u/23091650?s=460&v=4" height="200px" width="auto" alt=""/>
                </div>
                <div class={classes.cardContent}>
                    <img src="https://avatars0.githubusercontent.com/u/38118289?s=460&v=4" height="200px" width="auto" alt=""/>
                </div>
                <div class={classes.cardContent}>
                    <img src="https://avatars0.githubusercontent.com/u/28282149?s=460&v=4" height="200px" width="auto" alt=""/>
                </div>
            </section>
        )
    }
}

const StyledDemoLeaderboard = withStyles(styles)(DemoLeaderboard)
export default connect()(StyledDemoLeaderboard);
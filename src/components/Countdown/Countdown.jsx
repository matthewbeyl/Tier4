import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
class Countdown extends Component {
    state = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    };

    componentWillMount = () => {
        this.getTimeUntil(this.props.deadline);
    }

    componentDidMount = () => {
        setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
    }

    displayDigits = (number) => {
        return number < 10 ? '0' + number : number;
    }

    getTimeUntil = (deadline) => {
        const time = Date.parse(deadline) - Date.parse(new Date());
        if (time < 0) {
            this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else {
            const seconds = Math.floor((time / 1000) % 60);
            const minutes = Math.floor((time / 1000 / 60) % 60);
            const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
            const days = Math.floor(time / (1000 * 60 * 60 * 24));
            this.setState({ days, hours, minutes, seconds });
        }
    }

    render() {
        let content = '';
        if (this.props.deadline == null) {
            content = (
                <div>
                    <p>There is no upcoming challenge.</p>
                </div>
            )
        } else {
            content = (
                <div>

                    <div style={{ display: "grid", alignContent: "center", width: "100%", height: "350px", backgroundColor: "#cccccc" }}>
                        <div style={{ justifySelf: "center" }}>
                            <h1>Code now.</h1>
                        </div>
                        <div style={{ justifySelf: "center" }}>
                            <p>
                                Track your progress by signing up!
                            </p>
                        </div>
                        <Paper style={{justifySelf: "center", padding: "20px"}}>
                            <div>
                                <h3>30 Day Sprint Challenge</h3></div>
                            <div>
                                {this.displayDigits(this.state.days)} Days <br />
                            </div>
                            <div>
                                {this.displayDigits(this.state.hours)} Hours <br />
                            </div>
                            <div>
                                {this.displayDigits(this.state.minutes)} Minutes <br />
                            </div>
                            <div>
                                {this.displayDigits(this.state.seconds)} Seconds <br />
                            </div>
                            <div>
                                <p>Sign up before the next deadline! </p>
                            </div>
                        </Paper>
                    </div>
                </div>
            )
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}
export default Countdown;
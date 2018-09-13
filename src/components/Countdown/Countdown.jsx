import React, { Component } from 'react';

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
        return (
            <div>
                <div>
                    {this.displayDigits(this.state.days)} Days
                </div>
                <div>
                    {this.displayDigits(this.state.hours)} Hours
                </div>
                <div>
                    {this.displayDigits(this.state.minutes)} Minutes
                </div>
                <div>
                    {this.displayDigits(this.state.seconds)} Seconds
                </div>
            </div>
        )
    }
}
export default Countdown;
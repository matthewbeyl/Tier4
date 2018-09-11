import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStartDate } from '../../redux/actions/homeActions';
const mapStateToProps = state => ({
    startDate: state.challengeDate.date
});
class Countdown extends Component {
    componentDidMount() {
        this.props.dispatch(fetchStartDate());
    }
    render() {
        console.log(this.props.startDate);
        return (
            <main>
                <br />
                <section>
                    {/* {dateItem} */}
                    <h5>The next challenge starts {this.props.startDate}</h5>
                    <br />
                    <div id="clockdiv">
                        <div>
                            <span className="days"></span>
                            <div>Days</div>
                        </div>
                        <div>
                            <span className="hours"></span>
                            <div>Hours</div>
                        </div>
                        <div>
                            <span className="minutes"></span>
                            <div>Minutes</div>
                        </div>
                        <div>
                            <span className="seconds"></span>
                            <div>Seconds</div>
                        </div>
                    </div>
                </section>
            </main >
        )
    }
}
export default connect(mapStateToProps)(Countdown);
import React, { Component } from 'react';
import { connect } from 'react-redux';

class CreateNewChallengeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newChallenge: {
                title: '',
                date: new Date(),
                exclude_weekends: false,
                exclude_holidays: false
            }
        }

    }

    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            newChallenge: {
                ...this.state.newChallenge,
                [propertyName]: event.target.value
            }
        })
        console.log(this.state.newChallenge);
    }

    handleChangeForExclusion = (propertyName) => (event) => {
        this.setState({
            newChallenge: {
                ...this.state.newChallenge,
                [propertyName]: event.target.check
            }
        })
        console.log(this.state.newChallenge);
    }

    handleNewChallengeSubmit = () => {
        console.log(this.state.newChallenge);
        this.props.dispatch({type:'CREATE_NEW_CHALLENGE', payload: this.state.newChallenge})
    }

    render() {
        return (
            <div style={{ display: 'flex', position: 'fixed', width: '100%', height: '100%', top: '0', left: '0', right: '0', bottom: '0', margin: 'auto', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div style={{ postion: 'absolute', width: '500px', height: '250px', margin: 'auto', backgroundColor: 'white' }}>
                    
                    
                    <form>
                        <p>{this.props.text}</p>
                        <label>Challenge Title</label>
                        <input
                            required
                            value={this.state.newChallenge.title}
                            type="text"
                            placeholder="Title"
                            onChange={this.handleChangeFor('title')} /><br />
                        <label >Start Date</label>
                        <input
                            required
                            value={this.state.newChallenge.date}
                            type="date"
                            onChange={this.handleChangeFor('date')}
                        /><br />
                        Exclude Weekends:
                    <input
                            // checkbox is not capturing true/false
                            // MYL : fix this bug
                            type="checkbox"
                            // value={this.state.newChallenge.exclude_weekends}
                            // onChange={this.handleChangeFor('exclude_weekends')}
                        /><br />
                        Exclude Holidays:
                    <input
                            type="checkbox"
                            // value={this.state.newChallenge.exclude_holidays}
                            // onChange={this.handleChangeFor('exclude_holidays')}
                        /><br />
                        <button onClick={this.handleNewChallengeSubmit}>Create Challenge</button><br />
                        <button onClick={this.props.closePopupForm}>Cancel</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect()(CreateNewChallengeForm);
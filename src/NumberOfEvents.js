import React, {Component} from 'react';

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32
    } 

    handleInputChange = e => {
        const { value } = e.target;
        if(value >= 0){
            this.props.updateEvents(null, value);
            this.setState({
                numberOfEvents : value
            });
        } 
    }

    render() { 
        return (
            <div className="numberOfEvents">
                <label htmlFor="numEventsID">
                    Number of Events:
                </label>
                <input
                    type="number"
                    name="numberOfEvents"
                    id="numEventsID"
                    className="number-of-events"
                    value={this.state.numberOfEvents}
                    onChange={(e) => this.handleInputChange(e)}
                />
            </div>
        );
    }
}
 
export default NumberOfEvents;
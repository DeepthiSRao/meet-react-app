import React, {Component} from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32,
        infoText: ''
    } 

    handleInputChange = e => {
        const { value } = e.target;

        if(value <= 0 || value > 32){
            this.setState({
                numberOfEvents: value,
                infoText: 'Select number from 1 to 32'
            });
        }else {
            this.setState({
                numberOfEvents: value,
                infoText: ''
            });
            this.props.updateEvents(null, value);
        }

    }

    render() { 
        return (
            <div className="numberOfEvents">
                <ErrorAlert text={this.state.infoText} />
                <label htmlFor="numEventsID">
                    Number of Events:
                </label>
                <input
                    type="number"
                    name="numberOfEvents"
                    id="numEventsID"
                    value={this.state.numberOfEvents}
                    onChange={(e) => this.handleInputChange(e)}
                />
            </div>
        );
    }
}
 
export default NumberOfEvents;
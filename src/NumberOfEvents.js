import React, {Component} from 'react';
import { ErrorAlert } from './Alert';



class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32,
        infoText: null
    } 

    handleInputChange = e => {
        const { value } = e.target;
        setTimeout(() => {
            console.log("Delaying input");
        }, 2000);

        if(value <= 0 || value > 32){
            this.setState({
                numberOfEvents: value,
                infoText: 'Select number from 1 to 32'
            });
        }else {
            this.props.updateEvents(null, value);
            this.setState({
                numberOfEvents: value,
                infoText: ''
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
                <ErrorAlert text={this.state.infoText} />
            </div>
        );
    }
}
 
export default NumberOfEvents;
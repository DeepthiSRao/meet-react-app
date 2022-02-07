import React, {Component} from 'react';

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32
    } 

    handleInputChange = e => {
        const { value } = e.target;
        this.setState({
            numberOfEvents : value
        })
    }

    render() { 
        return (
            <div className="numberOfEvents">
                <input
                    type="number"
                    name="numberOfEvents"
                    className="number-of-events"
                    value={this.state.numberOfEvents}
                    onChange={e => this.handleInputChange(e)}
                />
            </div>
        );
    }
}
 
export default NumberOfEvents;
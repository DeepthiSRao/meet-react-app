import React, {Component} from 'react';

class Event extends Component {
    state = { 
        collapsed: true
    }; 

    handleClick = () =>{
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    render() {
        const { collapsed } = this.state;
        const { event } = this.props;

        return ( 
            <div className="event">
                <h2 className="summary">{event.summary}</h2>
                <p className="start-date">
                {event.start.dateTime} ({event.start.timeZone})
                </p>
                <p className="location">
                    @{event.summary} | {event.location}
                </p>
                {
                    !collapsed && 
                    <div className="more-details">
                        <h3>About event:</h3>
                        <a href={event.htmlLink} target="_blank" rel="noreferrer">
                            See details on Google Calendar
                        </a>
                        <p className="event-description">{event.description}</p>
                    </div>
                }
                <button className={collapsed ? "show-details":"hide-details"} onClick={this.handleClick}>
                    { collapsed ? 'show details' : 'hide details'}
                </button>
            </div>
        );
    }
}

export default Event;
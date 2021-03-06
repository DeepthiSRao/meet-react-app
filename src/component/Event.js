import React, { Component } from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { BsCalendarEvent } from 'react-icons/bs';
import { CgEventbrite } from 'react-icons/cg';

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
            <div className='event'>
                <h2 className='summary'>{event.summary}</h2>
                <p className='start-date'>
                {event.start.dateTime} ({event.start.timeZone})
                </p>
                <p>
                    <CgEventbrite/> {event.summary}
                </p>
                <p className='location'>
                    <HiLocationMarker /> {event.location}
                </p>
                {
                    !collapsed && 
                    <div className='more-details'>
                        <h3>About event:</h3>                       
                        <p className='event-description'>{event.description}</p>
                        <a href={event.htmlLink} target='_blank' rel='noreferrer'>
                            <BsCalendarEvent />See details on Google Calendar
                        </a>
                    </div>
                }
                <button className='details-btn' onClick={this.handleClick}>
                    { collapsed ? 'show details' : 'hide details'}
                </button>
            </div>
        );
    }
}

export default Event;
import React from 'react';
import Event from './Event';
import { WarningAlert } from './Alert';

const EventList = ({ events }) => {
    return ( 
        <div>
            { !navigator.onLine
               && <WarningAlert text="Your offline. Events data are loaded from cache!" />
            }
            <ul className="event-list">
                {
                    events.map(event => 
                        <li key={event.id} >
                            <Event event={event} />
                        </li>
                )}
            </ul>
        </div>
    );
}

export default EventList;
import React from 'react';
import { WarningAlert } from './Alert';
import EventList from './EventList';
import EventPieChart from './EventPieChart';
import EventScatterChart from './EventScatterChart';

const EventComponent = ({events, locations}) => {
    if(!navigator.onLine)
        return <WarningAlert text="Your offline. Events data are loaded from cache!" />
     
    return ( 
        <>
            { 
                events && (
                    <div className='event-page'>
                        <h1>Upcoming events in each city</h1> 
                        <div className='event-chart'>
                            <EventScatterChart events={events} locations={locations} />
                            <EventPieChart events={events} />
                        </div>
                        <EventList events={events} />
                    </div>
                )
            }
        </>
    );
}
 
export default EventComponent;
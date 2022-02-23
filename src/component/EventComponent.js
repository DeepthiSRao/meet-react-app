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
                        <EventScatterChart events={events} locations={locations} />
                        <EventPieChart events={events} />
                        <EventList events={events} />
                    </div>
                )
            }
        </>
    );
}
 
export default EventComponent;
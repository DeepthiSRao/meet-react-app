import React from 'react';
import { WarningAlert } from './Alert';
import EventList from './EventList';
import EventPieChart from './EventPieChart';
import EventScatterChart from './EventScatterChart';
import Loader from './Loader';

const EventComponent = ({events, locations}) => {
    if(!navigator.onLine)
        return <WarningAlert text="Your offline. Events data are loaded from cache!" />
    
    if( events.length === 0)
        return (<Loader />);
        
    return ( 
        <>
            { 
                events.length > 0 && (
                    <>
                        <div className='event-container'>
                            <h1>Upcoming events in each city</h1> 
                            <div className='event-chart'>
                                <EventScatterChart events={events} locations={locations} />
                                <EventPieChart events={events} />  
                            </div>
                        </div>
                        <EventList events={events} />
                    </>
                )
            }
        </>
    );
}
 
export default EventComponent;
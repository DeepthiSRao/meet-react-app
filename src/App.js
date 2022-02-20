import React, { Component } from 'react';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import './App.css';
import { extractLocations, getEvents } from './api';
import EventScatterChart from './EventScatterChart';
import EventPieChart from './EventPieChart';

class App extends Component {
    state = { 
        events: [],
        locations: [],
        currentLocation: 'all',
        numberOfEvents: 32
    };

    componentDidMount(){
        this.mounted = true; /* To fix warning related api call. 
                                This happens because Jest would have finished running(mount, test & unmount) before api call. */

        getEvents().then((events) => {
            this.mounted &&
            this.setState({
                events,
                locations: extractLocations(events)
            });
        });
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    // filter events by location/eventCount or by eventCount by previously saved location
    updateEvents = (location, eventCount) => {
        const { currentLocation, numberOfEvents } = this.state;

        location ?
        getEvents().then((events) => {
            const locationEvents = (location === 'all') ?
                                    events 
                                    : events.filter((event) => event.location === location);

            this.setState({
                events: locationEvents.slice(0, numberOfEvents),
                currentLocation: location
            });
        })
        : getEvents().then((events) => {
            const locationEvents = (currentLocation === 'all') ?
                                    events 
                                    : events.filter((event) => event.location === currentLocation);
            this.setState({
                events: locationEvents.slice(0, eventCount),
                numberOfEvents: eventCount
            });
        });
    }

    render(){
        const { events, locations } = this.state;

        return (
            <div className="App">
                <h1 className="title">MeetUp App</h1>
                <CitySearch 
                    locations={locations} 
                    updateEvents={this.updateEvents} />
                <NumberOfEvents updateEvents={this.updateEvents} />
                <EventScatterChart events={events} locations={locations} />
                <EventPieChart events={events} />
                <EventList events={events} />
            </div>
        );
    }
}

export default App;

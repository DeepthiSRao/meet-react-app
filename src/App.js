import React, { Component } from 'react';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import './App.css';
import { extractLocations, getEvents } from './api';

class App extends Component {
    state = { 
        events: [],
        locations: []
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

    updateEvents = location => {
        getEvents().then((events) => {
            const locationEvents = (location === 'all') ?
                                    events 
                                    : events.filter((event) => event.location === location);
            this.setState({
                events: locationEvents
            });
        });
    }

    render(){
        return (
        <div className="App">
            <h1 className="title">MeetUp App</h1>
            <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
            <NumberOfEvents />
            <EventList events={this.state.events} />
        </div>
        );
    }
}

export default App;

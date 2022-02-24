import React, { Component } from 'react';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, checkToken } from '../utils/api';
import EventComponent from './EventComponent';
import GoogleLogin from './GoogleLogin';
import './App.css';

class App extends Component {
    state = { 
        events: [],
        locations: [],
        currentLocation: 'all',
        numberOfEvents: 32,
        checkToken: null
    };

    async componentDidMount(){
        this.mounted = true; /* To fix warning related api call. 
                                This happens because Jest would have finished running(mount, test & unmount) before api call. */

        const accessToken = localStorage.getItem("access_token");
        const validToken = accessToken !== null ? await checkToken(accessToken) : false;
        this.setState({ checkToken: validToken });
        console.log(validToken);
        validToken && this.updateEvents();
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");
    
        if (code && this.mounted && !validToken ){ 
            this.setState({tokenCheck: true });
            this.updateEvents()
        }
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
        const { events, locations, checkToken } = this.state;

        return (
            <div className="App">
                <h1 className="title">MeetUp App</h1>
                {
                    !checkToken
                    ? <GoogleLogin />
                    :(
                        <>
                            <CitySearch 
                                locations={locations} 
                                updateEvents={this.updateEvents} />
                            <NumberOfEvents updateEvents={this.updateEvents} />
                            <EventComponent locations={locations} events={events} />
                        </>
                    )
                }
            </div>
        );
    }
}

export default App;

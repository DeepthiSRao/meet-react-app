import React, { Component } from 'react';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, checkToken, getAccessToken } from '../utils/api';
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

        if(validToken) 
            this.updateEvents();

        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");
        console.log(code);

        if (code && this.mounted && validToken === false ){ 
            this.setState({checkToken: true });
            this.updateEvents()
        }
    }

    // componentDidMount(){
    //     this.mounted = true; /* To fix warning related api call. 
    //                             This happens because Jest would have finished running(mount, test & unmount) before api call. */

    //     getEvents().then((events) => {
    //         this.mounted &&
    //         this.setState({
    //             events,
    //             locations: extractLocations(events)
    //         });
    //     });
    // }

    componentWillUnmount(){
        this.mounted = false;
    }

    // filter events by location/eventCount or by eventCount by previously saved location
    updateEvents = (location, eventCount) => {
        const { currentLocation, numberOfEvents } = this.state;

        location ?
        getEvents().then((events) => {
            const locationEvents = (location === 'All') ?
                                    events 
                                    : events.filter((event) => event.location === location);

            this.setState({
                events: locationEvents.slice(0, numberOfEvents),
                currentLocation: location
            });
        })
        : getEvents().then((events) => {
            const locationEvents = (currentLocation === 'All') ?
                                    events 
                                    : events.filter((event) => event.location === currentLocation);
            this.setState({
                events: locationEvents.slice(0, eventCount),
                numberOfEvents: eventCount
            });
        });
    }

    handleSubmit  = e => {
        e.preventDefault();
        console.log('Submit clicked');
    }

    render(){
        const { events, locations, checkToken } = this.state;

        return (
            <div className="App">
                {
                    !!checkToken
                    ? <GoogleLogin getAccessToken={() => getAccessToken()}/>
                    :(
                        <>
                            <h1 className="title">MeetUp App <br />
                                <p>Connecting Developers World Wide</p>
                            </h1>
                            <hr className="horizontal-line" />
                            <form onSubmit={e => this.handleSubmit(e)} className="city-serach-form">
                                <CitySearch 
                                    locations={locations} 
                                    updateEvents={this.updateEvents} />
                                <NumberOfEvents updateEvents={this.updateEvents} />
                                <button type='submit' className='search-btn'>
                                    Search
                                </button>
                            </form>
                            <EventComponent locations={locations} events={events} />
                        </>
                    )
                }
            </div>
        );
    }
}

export default App;

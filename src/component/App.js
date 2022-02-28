import React, { Component } from 'react';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, checkToken, getAccessToken, extractLocations } from '../utils/api';
import EventComponent from './EventComponent';
import GoogleLogin from './GoogleLogin';

class App extends Component {
    state = { 
        events: [],
        locations: [],
        currentLocation: 'All',
        numberOfEvents: 32,
        // showLogin: null
        showLogin: false
    };

    async componentDidMount(){
        this.mounted = true; /* To fix warning related api call. 
                                This happens because Jest would have finished running(mount, test & unmount) before api call. */

        // const accessToken = localStorage.getItem("access_token");
        // const validToken = accessToken !== null ? await checkToken(accessToken) : false;
        // const searchParams = new URLSearchParams(window.location.search);
        // const code = searchParams.get("code");
        // this.setState({ showLogin: !(code || validToken) });

        // if ((code|| validToken) && this.mounted ){ 
            getEvents().then((events) => {
                if (this.mounted) {
                    this.setState({
                        events: events.slice(0, this.state.numberOfEvents),
                        locations: extractLocations(events),
                    });
                }
              });
        // }
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    // filter events by location/eventCount or by eventCount by previously saved location
    updateEvents = (location, eventCount) => {
        const { currentLocation, numberOfEvents } = this.state;

        !!location ?
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
        const { events, locations, showLogin } = this.state;

        return (
            <div className="container">
                {
                    showLogin
                    ? <GoogleLogin getAccessToken={() => getAccessToken()}/>
                    :(
                        <>
                            <h1 className="title">MeetUp App <br />
                                <p>Connecting Developers World Wide</p>
                            </h1>
                           <div className='form-container'>
                                <form onSubmit={e => this.handleSubmit(e)} className="city-serach-form">
                                    <CitySearch 
                                        locations={locations} 
                                        updateEvents={this.updateEvents} />
                                    <NumberOfEvents updateEvents={this.updateEvents} />
                                    <button type='submit' className='search-btn'>
                                        Search
                                    </button>
                                </form>
                           </div>
                            <EventComponent locations={locations} events={events} />
                        </>
                    )
                }
            </div>
        );
    }
}

export default App;

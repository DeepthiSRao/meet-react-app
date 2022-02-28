import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../component/App';
import EventList from '../component/EventList';
import CitySearch from '../component/CitySearch';
import NumberOfEvents from '../component/NumberOfEvents';
import { mockData } from '../utils/mockData';
import { extractLocations, getEvents } from '../utils/api';

describe(
    '<App /> component', () => {
        let AppWrapper;

        beforeAll(() => {
            AppWrapper = shallow(<App />);
        });

        test('render list of events', () => {
            expect(AppWrapper.find(EventList)).toHaveLength(1);
        });

        test('render CitySearch', () => {
            expect(AppWrapper.find(CitySearch)).toHaveLength(1);
        });

        test('render NumberOfEvents', () => {
            expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
        });
    }
);

describe('<App /> integration test', () => {
    test('App passes "events" as prop to EventList', () => {
        const AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount();
    });

    test('App passes "locations" as prop to CitySearch', () => {
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    });

    test('get list of events matching the city selected by the user', async() => {
        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations});
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectIndex = Math.floor(Math.random() * suggestions.length);
        const selectCity = suggestions[selectIndex];
        await CitySearchWrapper.instance().handleItemClicked(selectCity);
        const allEvents = await getEvents();
        const eventToShow = allEvents.filter( event => event.location === selectCity);
        expect(AppWrapper.state('events')).toEqual(eventToShow);
        AppWrapper.unmount();
    });

    test('get list of all events when user selects "See all cities"', async() => {
        const AppWrapper = mount(<App />);
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length -1).simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });

    test('update number of events after user changes number of events', async() => {
        const AppWrapper = mount(<App />);
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        const eventCount = 2;
        await NumberOfEventsWrapper.instance().handleInputChange({
            target: {value: eventCount},
        });
        const allEvents = await getEvents();
        expect(AppWrapper.state('events').length).toEqual(allEvents.slice(0, eventCount).length);
        AppWrapper.unmount();
    });
});
import React from 'react';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { mockData } from '../mockData';
import CitySearch from '../CitySearch';
import { extractLocations } from '../api';

// need use absolute path from root
const feature = loadFeature('./src/features/filterEventsByCity.feature');

// use npm run test --> to generate template on cmd prompt from user defined feature file
defineFeature( feature, test => {
    let AppWrapper, CitySearchWrapper;
    let locations = extractLocations(mockData);

    test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
        given('user hasn’t searched for any city', () => {

        });

        when('the user opens the app', () => {
            AppWrapper = mount(<App />);
        });

        then('the user should see the list of upcoming events.', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });
    });

    test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {
        given('the main page is open', () => {
            CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={()=>{}} />);
        });

        when('the user starts typing in the city textbox', () => {
            CitySearchWrapper.find('.city').simulate('change',{
                target: { value: 'Berlin'}
            });
        });
        // list has option city name searched + option 'See all cities'
        then('the user should receive a list of cities (suggestions) that match what they’ve typed', () => {
            expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
        });
    });

    test('User can select a city from the suggested list', ({ given, and, when, then }) => {
        given('user was typing “Berlin” in the city textbox', async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.find('.city').simulate('change', {
                target: {value: 'Berlin'}
            });
        });

        and('the list of suggested cities is showing', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.suggestions li')).toHaveLength(2);
        });

        when('the user selects a city (e.g., “Berlin, Germany”) from the list', () => {
            AppWrapper.find('.suggestions li').at(0).simulate('click');
        });

        then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
            // referring to child component is possible, because of full rendering api to mount App component
            const CitySearchWrapper = AppWrapper.find(CitySearch);
            expect(CitySearchWrapper.state('query')).toBe('Berlin, Germany')
        });

        and('the user should receive a list of upcoming events in that city', () => {
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });
    });
});


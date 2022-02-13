import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount, shallow } from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature( feature, test => {
    test('When user hasn\'t specified a number, 32 is the default number', ({ given, when, then }) => {
        let AppWrapper;

        given('the user did not specify a number of events being shown', () => {

        });

        when('app loaded', () => {
            AppWrapper = mount(<App />);
        });

        then(/^the default number of events shown is (\d+)$/, (arg0) => {
            AppWrapper.update();
            expect(AppWrapper.find('.events').length).toBeLessThanOrEqual(32);
        });
    });

    test('User can change the number of events they want to see', ({ given, when, then }) => {
        let AppWrapper;

        given('the list of events has been loaded', () => {
            AppWrapper = mount(<App />);
        });

        when('the user specified a number', () => {
            const  numberOfEvents = { 
                target: {value : 4}
            };
            AppWrapper.find('.number-of-events').simulate('change', numberOfEvents);
        });

        then('the number of events listed should be the specified number', () => {
            const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
            NumberOfEventsWrapper.setState({ numberOfEvents : 4});
            expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(4);
        });
    });
});
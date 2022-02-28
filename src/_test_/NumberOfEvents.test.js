import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../component/NumberOfEvents';

describe('<Number Of Events /> Component', () => {
    let NumberOfEventsWrapper;

    beforeAll(()=>{
        NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}}/>);
    });

    test('render text input', () => {
        expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
    });

    test('render text input value correctly', () => {
        expect(NumberOfEventsWrapper.find('.number-of-events').prop('value')).toBe(32);
    });

    test('change state when text input changes',  () => {
        NumberOfEventsWrapper.setState({
            numberOfEvents: 2
        });
        const numberOfEventsObject = { target: { value: 2 } };
        NumberOfEventsWrapper.find('.number-of-events').simulate('change', numberOfEventsObject);
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(2);
    });
});
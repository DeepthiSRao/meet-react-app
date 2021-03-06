import React from 'react';
import { shallow } from 'enzyme';
import Event from '../component/Event';
import { mockData } from '../mockData';

describe('<Event /> Component', () => {
    let EventWrapper;

    beforeAll(() => {
        EventWrapper = shallow(<Event event={mockData[0]} />);
    });

    test('render event', () => {
        expect(EventWrapper.find('.event')).toHaveLength(1);
    });

    test('render event summary', () => {
        expect(EventWrapper.find('.summary')).toHaveLength(1);
    });

    test('render event location', () => {
        expect(EventWrapper.find('.location')).toHaveLength(1);
    });

    test('render event show details button', () => {
        expect(EventWrapper.find('.details-btn')).toHaveLength(1);
    });

    test('show details on button click', () => {
        EventWrapper.setState({
            collapsed: true
        });
        EventWrapper.find('.details-btn').simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(false);
    });

    test('hide details on button click', () => {
        EventWrapper.setState({
            collapsed: false
        });
        EventWrapper.find('.details-btn').simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(true);
    });
});
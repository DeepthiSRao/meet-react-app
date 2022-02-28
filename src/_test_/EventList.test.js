import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../component/EventList';
import Event from '../component/Event';
import { mockData } from '../utils/mockData';

describe('<EventList/> Component', () => {
    test('render correct number of events', () => {
        const EventListWrapper = shallow(<EventList events={mockData} />);
        expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
    });
});
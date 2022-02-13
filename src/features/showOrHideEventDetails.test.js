import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import App from '../App';
import { mockData } from '../mockData';

const feature = loadFeature('./src/features/showOrHideEventDetails.feature');

defineFeature( feature, test => {
    test('An event element is collapsed by default', ({ given, and, when, then }) => {
        let AppWrapper;

        given('app loaded', () => {
            AppWrapper = mount(<App />);
        });

        and('the list of events has been loaded', () => {
        });

        when('the user has not clicked on {Show Details} yet', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });

        then('the event detail elements are collapsed', () => {
            expect(AppWrapper.find(".event .more-details")).toHaveLength(0);
        });
    });

    test('User can expand an event to see its details', ({ given, and, when, then }) => {
        let AppWrapper;

        given('app loaded', () => {
            AppWrapper = mount(<App />);
        });

        and('the list of events has been loaded', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });

        when('the user clicks on {Show Details} button', () => {
            AppWrapper.find(".event .details-btn").at(0).simulate('click');
        });

        then('event element expands and shows more details about event', () => {
            expect(AppWrapper.find(".event .more-details")).toHaveLength(1);
        });
    });

    test('User can collapse an event to hide its details', ({ given, and, when, then }) => {
        let AppWrapper;

        given('app loaded', () => {
            AppWrapper = mount(<App />);
        });

        and('event element is expanded', () => {
            AppWrapper.update();
            AppWrapper.find(".event .details-btn").at(0).simulate('click');
            expect(AppWrapper.find(".event .more-details")).toHaveLength(1);
        });

        when('the user clicks on {Hide Details} button', () => {
            AppWrapper.find(".event .details-btn").at(0).simulate('click');
        });

        then('the event detail elements are collapsed', () => {
            expect(AppWrapper.find(".event .more-details")).toHaveLength(0);
        });
    });

});
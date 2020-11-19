import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import CitySearch from '../CitySearch';
import { extractLocations, locations } from '../api';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
  test('When user hasn\'t searched for a city, show upcoming ecvenrts from all cities', ({ given, when, then }) => {
    given('user hasn\'t searched for any city', () => {

    });
    let AppWrapper;
    when('the user opens the app', () => {
      AppWrapper = mount(<App />)
    });

    then('the user should see the list of upcoming events', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
    });
  });

  test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {

    let CitySearchWrapper;
    given('the main page is open', () => {
      CitySearchWrapper = shallow(<CitySearch /*updateEvents={() => { }} /*locations={locations}*/ />);
    });

    when('the user starts typing in the city textbox', () => {
      CitySearchWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
    });

    then('the user should receive a list of cities (suggestions) that match what they\'ve typed', () => {
      expect(CitySearchWrapper.find('suggestions li')).toHaveLength(2);
    });
  });

  test('User can select a city from the suggested list', ({ given, and, when, then }) => {
    given(/^user was typing in "(.*)" in the city textbox$/, (arg0) => {

    });

    and('the list of suggested cities is showing', () => {

    });

    when(/^the user selects a city \(e.g., "(.*)"\) from the list$/, (arg0) => {

    });

    then(/^their city should be changed to that city  \(i.e., "(.*)"\)$/, (arg0) => {

    });
    and('the user should receive a list of upcomning events in that city', () => {

    });
  });
});
import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents'
import { mockData } from '../mock-data';
import CitySearch from '../CitySearch';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When the user opens the app the default number of events displayed is 32', ({ given, when, then }) => {
    let AppWrapper;
    given('user opens the app', () => {

    });

    when('the user hasn\'t changed anything', () => {
      AppWrapper = mount(<App />)
    });

    then('the number of events is thirty two', () => {
      expect((AppWrapper.find('.event')).length).toBeLessThanOrEqual(32)
    });
  });

  test('When the user changes the number of events there will be that many displayed', ({ given, when, then }) => {
    let AppWrapper;
    given('there are thirty two events displayed', () => {
      AppWrapper = mount(<App />)
    });

    when('the user changes the number', () => {
      const eventNumber = { target: { value: 12 } };
      AppWrapper.find('.numberOfEvents').simulate('change', eventNumber);
    });

    then('there will be the new number of events displayed', () => {
      let eventNumber;
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      expect(NumberOfEventsWrapper.state('number')).toEqual(eventNumber);
    });
  });
});
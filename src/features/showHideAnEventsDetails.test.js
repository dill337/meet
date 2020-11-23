import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import CitySearch from '../CitySearch';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('When the user opens up the page the details are not showing', ({ given, when, then }) => {
    let AppWrapper;
    given('user opens the app', () => {
    });
    when('the user hasn\'t clicked on anything', () => {
      AppWrapper = mount(<App />);
    });

    then('the event details are collapsed', () => {
      expect(AppWrapper.find('.eventDetails')).toHaveLength(0)
    });
  });

  test('User should be able to click an event button to see details', ({ given, when, then }) => {
    let AppWrapper;

    given('details button is collapsed', () => {
      AppWrapper = mount(<App />);
    });

    when('the user clicks on an event details button', () => {
      AppWrapper.update()
      AppWrapper.find('.details-btn').at(0).simulate('click');
    });

    then('the user should see more information on that event', () => {
      expect(AppWrapper.find('.event__Details')).toHaveLength(1)
    });
  });


  test('User should be able to click an event button to see minimize details', ({ given, and, when, then }) => {
    let AppWrapper;
    given('the details are visible', () => {
      AppWrapper = mount(<App />);
    });

    and('the event details are already showing', () => {
      AppWrapper.update();
      AppWrapper.find('.details-btn').at(0).simulate('click');
      expect(AppWrapper.find('.event__Details')).toHaveLength(1)
    });

    when('the user clicks on an event details button', () => {
      AppWrapper.find('.details-btn').at(0).simulate('click');
    });

    then('the event detail should collapse', () => {
      expect(AppWrapper.find('.eventDetails')).toHaveLength(0)
    });
  });

});

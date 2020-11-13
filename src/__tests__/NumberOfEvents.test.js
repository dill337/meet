import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => { }} />);
  });

  test('render text-box', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
  })

  test('render the number of events list label', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents label')).toHaveLength(1);
  });

  test('check number of evens in text box is rendered correctly', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents input')).toHaveLength(1);
  });

  test('ensure default value of 32 events', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents input').prop('value')).toBe(32);
  });

  test('check ability to change number of events', () => {
    NumberOfEventsWrapper.find('.numberOfEvents input').simulate('change', {
      target: { value: 12 },
    })
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(12);
  });

})
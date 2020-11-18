import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';


class App extends Component {
  state = {
    events: [],
    locations: [],
  }

  //   componentDidMount() {
  //     this.mounted = true;
  //     getEvents().then((response) => {
  //       if (this.mounted) {
  //         this.setState({ events: response.events, locations: response.locations });
  //       }
  //     });
  //   },

  //   componentWillUnmount() {
  //     this.mounted = false;
  //   }
  // }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        console.log(events);
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    let count = eventCount ? eventCount : 32
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events.slice(0, count) :
        events.filter((event) => event.location === location).slice(0, count);
      this.setState({
        events: locationEvents
      });
    });
  }
  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
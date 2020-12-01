import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken } from './api';
import Login from "./Login";


class App extends Component {
  state = {
    events: [],
    locations: [],
    tokenCheck: false,
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

  async componentDidMount() {
    const accessToken =
      localStorage.getItem("access_token");
    const validToken = accessToken !== null ? await
      checkToken(accessToken) : false;
    this.setState({ tokenCheck: validToken });
    if (validToken === true) this.updateEvents()
    const searchParams = new
      URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.mounted = true;

    getEvents().then((events) => {
      if (code && this.mounted === true && validToken === false) {
        console.log(events);
        this.setState({ tokenCheck: true, events, locations: extractLocations(events) });
        this.updateEvents()
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
    return this.state.tokenCheck === false ? (
      <div className="App">
        <Login />
      </div>
    ) : (
        <div className="App">
          <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
          <NumberOfEvents updateEvents={this.updateEvents} />
          <EventList events={this.state.events} />
        </div>
      );
  }
}

export default App;
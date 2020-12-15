import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken } from './api';
import Login from "./login";


class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    tokenCheck: false,
    selectedLocation: 'all',
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
      if (code && this.mounted === true) {/*&& validToken === false) {
        console.log(events);*/
        this.setState({ tokenCheck: true, events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateLocation = async (location) => {
    await this.setState({ selectedLocation: location })
    await this.updateEvents()
    // console.log(location);
    // this.setState({ selectedLocation: location }, this.updateEvents())
  }

  updateEventCount = async (numberOfEvents) => {
    await this.setState({ numberOfEvents })
    await this.updateEvents()
    // console.log(numberOfEvents)
    // this.setState({ numberOfEvents }, this.updateEvents())
  }

  updateEvents = () => {
    const { selectedLocation, numberOfEvents } = this.state
    getEvents().then((events) => {
      const locationEvents = (selectedLocation === 'all') ?
        events.slice(0, numberOfEvents) :
        events.filter((event) => event.location === selectedLocation).slice(0, numberOfEvents);
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
          <CitySearch
            locations={this.state.locations}
            updateEvents={this.updateEvents}
            selectedLocation={this.state.selectedLocation}
            updateLocation={this.updateLocation} />
          <NumberOfEvents
            updateEvents={this.updateEvents}
            numberOfEvents={this.state.numberOfEvents}
            updateEventCount={this.updateEventCount} />
          <EventList events={this.state.events} />
        </div>
      );
  }
}

export default App;
import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from './EventGenre';
import { getEvents, extractLocations, checkToken } from './api';
import Login from "./login";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(' ').shift()
      return { city, number };
    })
    return data;
  }

  render() {
    const { locations, numberOfEvents } = this.state;
    return this.state.tokenCheck === false ? (
      <div className="App">
        <Login />
      </div>
    ) : (
        <div className="App">
          <h1>Meet App</h1>
          <h4>Choose your nearest City</h4>
          <CitySearch
            locations={this.state.locations}
            updateEvents={this.updateEvents}
            selectedLocation={this.state.selectedLocation}
            updateLocation={this.updateLocation} />
          <NumberOfEvents
            updateEvents={this.updateEvents}
            numberOfEvents={this.state.numberOfEvents}
            updateEventCount={this.updateEventCount} />
          <h4>Events in each city</h4>
          <div className="data-vis-wrapper">
            <EventGenre events={this.state.events} />
            <ResponsiveContainer height={400} >
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20, }}>
                <CartesianGrid />
                <XAxis type="category" dataKey="city" name="city" />
                <YAxis
                  allowDecimals={false}
                  type="number"
                  dataKey="number"
                  name="number of events"
                />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={this.getData()} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <EventList events={this.state.events} />
        </div>
      );
  }
}

export default App;
import React, { Component } from "react";


class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    infoText: ''
  }

  handleOnChange = (event) => {
    const value = event.target.value;
    this.props.updateEvents('all', value);
    this.setState({ numberOfEvents: value });
  };


  render() {
    return (
      <div className='numberOfEvents'>
        <label>Number of Events: </label>
        <input
          type="text"
          id="numbeOfEvents__input"
          className="eventsNumber"
          value={this.state.numberOfEvents}
          onChange={this.handleOnChange}>

        </input>

      </div>
    )
  }
}

export default NumberOfEvents;
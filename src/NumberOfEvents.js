import React, { Component } from "react";
import { ErrorAlert } from './Alert';



class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    infoText: ''
  }

  handleOnChange = (event) => {
    const value = event.target.value;
    this.props.updateEvents('all', value);
    this.setState({ numberOfEvents: value });

    if (value < 0) {
      this.setState({
        infoText: 'Must be a positive number...'
      });
    } else {
      this.setState({
        infoText: ''
      })
      this.props.updateEvents(null, value);
    }
  };


  render() {
    return (
      <div className='numberOfEvents'>
        <ErrorAlert text={this.state.infoText} />
        <label>Number of Events: </label>
        <input
          type="text"
          id="numbeOfEvents__input"
          className="eventsNumber"
          value={this.state.numberOfEvents}
          onChange={this.handleOnChange}
        >

        </input>

      </div>
    )
  }
}

export default NumberOfEvents;
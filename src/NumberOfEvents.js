import React, { Component } from "react";
import { ErrorAlert } from './Alert';



class NumberOfEvents extends Component {
  state = {
    infoText: ''
  }

  handleOnChange = (event) => {
    const value = event.target.value;
    this.props.updateEventCount(value)
    // this.props.updateEvents(null, value);
    // this.setState({ numberOfEvents: value });

    if (value < 0) {
      this.setState({
        infoText: 'Must be a positive number...'
      });
    } else {
      this.setState({
        infoText: ''
      })
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
          value={this.props.numberOfEvents}
          onChange={this.handleOnChange}
        >

        </input>

      </div>
    )
  }
}

export default NumberOfEvents;
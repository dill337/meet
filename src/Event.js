import React, { Component } from "react";


class Event extends Component {
  state = {
    showDetails: false,
  };

  handleShowDetails = () => {
    if (this.state.showDetails === false) {
      this.setState({ showDetails: true });
    } else {
      this.setState({ showDetails: false });
    }
  };

  render() {
    const showDetails = this.state.showDetails;
    const event = this.props.event;

    return <div className="event">
      <div className='event_Overview'>
        <p className="event_Overview--name">{this.props.event.summary}</p>
        <p className="event_Overview--description">{this.props.event.description}</p>
        <p className="event_Overview--location">{this.props.event.location}</p>
        <p className="event_Overview--link">{this.props.event.htmlLink}</p>
        <button className="event_Overview button" onClick={() => this.handleShowDetails()}>show details</button>

      </div>
      {this.state.showDetails && (
        <div className="event__Details">
          <p className="event__Details--description">
            {this.props.event.description}
          </p>
        </div>
      )}
    </div>;
  }
}
export default Event
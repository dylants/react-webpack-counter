import React, { Component, PropTypes } from 'react';

export default class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>Counter {this.props.count}</p>
        <button onClick={this.props.onIncrementClick}>+</button>
        <button onClick={this.props.onDecrementClick}>-</button>
      </div>
    );
  }
}

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  onIncrementClick: PropTypes.func.isRequired,
  onDecrementClick: PropTypes.func.isRequired,
};

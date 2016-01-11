import React, { Component, PropTypes } from 'react';

export default class Counter extends Component {
  constructor(props) {
    super(props);
  }

  increment() {
    console.log('increment');
  }

  decrement() {
    console.log('decrement');
  }

  render() {
    return (
      <div>
        <p>Counter {this.props.count}</p>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}

Counter.propTypes = {
  count: PropTypes.number,
};

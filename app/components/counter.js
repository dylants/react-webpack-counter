import React, { Component, PropTypes } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import CounterStore from 'stores/counterStore';
import CounterActions from 'actions/counterActions';

class Counter extends Component {
  static getStores() {
    return [CounterStore];
  }

  static getPropsFromStores() {
    return CounterStore.getState();
  }

  increment() {
    CounterActions.incrementCounter();
  }

  decrement() {
    CounterActions.decrementCounter();
  }

  render() {
    return (
      <div>
        <p>Counter {this.props.counter}</p>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}

Counter.propTypes = {
  counter: PropTypes.number,
};

export default connectToStores(Counter);

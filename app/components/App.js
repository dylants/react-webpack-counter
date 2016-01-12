import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from './counter';
import * as CounterActions from '../actions/CounterActions';
import '../scss/app.scss';

class App extends Component {
  render() {
    const { counter, counterActions } = this.props;
    return (
      <div>
        <h1>Counter App</h1>
        <Counter count={counter.count}
          onIncrementClick={counterActions.incrementCounter}
          onDecrementClick={counterActions.decrementCounter}
        />
      </div>
    );
  }
}

App.propTypes = {
  counter: PropTypes.object.isRequired,
  counterActions: PropTypes.object.isRequired,
};

/*
 * The objects in the `state` correspond to the objects set in the reducers
 * which are given to the `createStore` function in the `configureStore` file.
 * Since we use `combineReducers`, we're providing an object of reducers, but
 * our case we only have the one -- `counter`.
 */
function mapStateToProps(state) {
  return {
    counter: state.counter,
  };
}

/*
 * The elements returned in this object represent ALL the actions in each
 * actions file.  This code is wrapping a dispatch call around each action function.
 */
function mapDispatchToProps(dispatch) {
  return {
    counterActions: bindActionCreators(CounterActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

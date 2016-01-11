import alt from 'alt-app';
import CounterActions from 'actions/counterActions';

class CounterStore {
  constructor() {
    this.counter = 0;

    this.bindListeners({
      incrementCounter: CounterActions.INCREMENT_COUNTER,
      decrementCounter: CounterActions.DECREMENT_COUNTER,
    });
  }

  incrementCounter() {
    this.counter++;
  }

  decrementCounter() {
    this.counter--;
  }
}

export default alt.createStore(CounterStore, 'CounterStore');

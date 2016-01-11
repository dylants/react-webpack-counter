import React from 'react';
import Counter from 'components/counter';
import 'scss/app.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Counter App</h1>
        <Counter/>
      </div>
    );
  }
}

export default App;

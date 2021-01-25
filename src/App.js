import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../node_modules/@fortawesome/fontawesome-free/css/all.css';
import React from 'react';

import Navigation from './Components/Navigation/Navigation';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navigation/>
      </React.Fragment>
    );
  }
}

export default App;

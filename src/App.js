import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../node_modules/@fortawesome/fontawesome-free/css/all.css';
import './App.css';
import React from 'react';
import { connect } from 'react-redux';

import Navigation from './Components/Navigation/Navigation';

class App extends React.Component {

  render() {
    this.props.theme ? document.body.style = 'background: white; color: black' : document.body.style = 'background: #282828; color: white';

    return (
      <React.Fragment>
        <Navigation />
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    theme: state.theme,
  }
}
export default connect(mapStatetoProps)(App);

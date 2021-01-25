import './Home.css';

import React from 'react';

import HomeOptions from './HomeOptions/HomeOptions';

class Home extends React.Component {
    render() {
        return (
            <React.Fragment>
                <HomeOptions type="movie"/>
                <HomeOptions type="tv"/>
            </React.Fragment>
        );
    }

}

export default Home;
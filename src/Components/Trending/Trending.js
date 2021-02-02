import './Trending.css';

import React from 'react';

import HomeOptions from './../Home/HomeOptions/HomeOptions';

class Trending extends React.Component {

    Arr = ['day', 'week']
    ArrTitle = ['Day', 'Week']

    render() {
        return (
            <React.Fragment>
                <HomeOptions type="movie" Arr={this.Arr} ArrTitle={this.ArrTitle} menu="trending" />
                <HomeOptions type="tv" Arr={this.Arr} ArrTitle={this.ArrTitle} menu="trending" />
            </React.Fragment>
        );
    }
}

export default Trending;
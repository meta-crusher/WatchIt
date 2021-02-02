import './Home.css';

import React from 'react';

import HomeOptions from './HomeOptions/HomeOptions';

class Home extends React.Component {

    movieArr = ['now_playing', 'popular', 'top_rated', 'upcoming']
    movieArrTitle = ['Now Playing', 'Popular', 'Top Rated', 'Upcoming']
    tvArr = ['airing_today', 'on_the_air', 'popular', 'top_rated']
    tvArrTitle = ['Airing Today', 'On The Air', 'Popular', 'Top Rated']

    render() {
        return (
            <React.Fragment>
                <HomeOptions type="movie" Arr={this.movieArr} ArrTitle={this.movieArrTitle} />
                <HomeOptions type="tv" Arr={this.tvArr} ArrTitle={this.tvArrTitle} />
            </React.Fragment>
        );
    }

}

export default Home;
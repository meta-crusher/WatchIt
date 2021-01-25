import './Trending.css';

import axios from "axios";
import React from 'react';

import TrendCarousel from './TrendCarousel/TrendCarousel';

class Trending extends React.Component {

    state = {
        moviedata: [],
        tvdata: [],
    }

    componentDidMount() {
        axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=db247c4fb5373ec3fc33ba76868459bb')
            .then(response => {
                // console.log(response.data)
                this.setState(() => {
                    return {
                        moviedata: response.data.results,
                    }
                })
            });

        axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=db247c4fb5373ec3fc33ba76868459bb')
            .then(response => {
                this.setState(() => {
                    return {
                        tvdata: response.data.results,
                    }
                })
            });
    }

    render() {
        return (
            <React.Fragment>
                <TrendCarousel name="Trending Movies" data={this.state.moviedata} type="movie"/>
                <TrendCarousel name="Trending TV" data={this.state.tvdata} type="tv" />
            </React.Fragment>
        );
    }
}

export default Trending;
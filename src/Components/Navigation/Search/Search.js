import axios from 'axios';
import React from 'react';

import SearchOptions from './SearchOptions/SearchOptions';

class Search extends React.Component {

    state = {
        data: [],
    }

    header = 'https://api.themoviedb.org/3/search/multi?api_key=';
    api = 'db247c4fb5373ec3fc33ba76868459bb';
    mid = '&language=en-US&query=';
    query = this.props.match.params.query;
    end = '&page=1&include_adult=false';
    url = this.header + this.api + this.mid + this.query + this.end;


    componentDidMount() {
        axios.get(this.url).then(response => {
            this.setState(() => {
                return {
                    data: response.data.results,
                }
            })
        })
    }

    render() {
        const searchItems = this.state.data ? this.state.data.map(content => {
            return (
                content.media_type === 'tv' || content.media_type === 'movie' ? <SearchOptions data={content} /> : null
            );
        }) : null;
        return (
            <React.Fragment>
                {searchItems}
            </React.Fragment>
        );
    }
}

export default Search;
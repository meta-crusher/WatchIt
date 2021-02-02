import './HomeOptions.css'

import React from 'react';
import { Col, Nav, Navbar, Row } from 'reactstrap';
import axios from 'axios';

import TrendCarousel from './../../Trending/TrendCarousel/TrendCarousel';

class HomeOptions extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            "o0": [],
            "o1": [],
            "o2": [],
            "o3": [],
            currActive: 'o0',
        }
        //for Api Url
        this.header = 'https://api.themoviedb.org/3/'
        this.menu = this.props.menu === 'trending' ? 'trending/' : '';
        this.type = this.props.type + '/'
        this.api = '?api_key=db247c4fb5373ec3fc33ba76868459bb&language=en-US'
        // this.movieArr = ['now_playing', 'popular', 'top_rated', 'upcoming']
        // this.movieArrTitle = ['Now Playing', 'Popular', 'Top Rated', 'Upcoming']
        // this.tvArr = ['airing_today', 'on_the_air', 'popular', 'top_rated']
        // this.tvArrTitle = ['Airing Today', 'On The Air', 'Popular', 'Top Rated']
        // this.currArr = this.props.type === 'tv' ? this.tvArr : this.movieArr;
        // this.currArrTitle = this.props.type === 'tv' ? this.tvArrTitle : this.movieArrTitle;
        this.currArr = this.props.Arr;
        this.currArrTitle = this.props.ArrTitle;
        this.url = []
        this.currArr.forEach(options => {
            this.url.push(this.header + this.menu + this.type + options + this.api)
        })
    }


    componentDidMount() {
        let i = 0
        for (const key in this.state) {
            axios.get(this.url[i]).then(response => {
                this.setState(() => {
                    return {
                        [key]: response.data.results
                    }
                })
            })
            i++;
        }
    }

    showOptionsHandler(index) {
        const currActive = 'o' + index.toString();
        this.setState(() => {
            return {
                currActive: currActive,
            }
        })
    }

    render() {
        const showOptions = this.currArrTitle.map((content, index) => {
            return (
                <div key={index} className={" OptionsHome " + (this.state.currActive === ('o' + index.toString()) ? "SelectedHome" : "")} onClick={this.showOptionsHandler.bind(this, index)}>
                    {content}
                </div>
            );
        });

        return (
            <React.Fragment>
                <Navbar>
                    <Row>
                        <Col tag="h5" xs="12" md="12">
                            {this.props.menu === "trending" ? <div>Trending {this.props.type}</div> : <div>Watch latest {this.props.type}</div>}
                        </Col>
                        <Col md="10">
                            <Nav className="HomeNavOptions">
                                {showOptions}
                            </Nav>
                        </Col>
                    </Row>
                    <TrendCarousel data={this.state[this.state.currActive]} type={this.props.type} />
                </Navbar>
            </React.Fragment>
        );
    }

}

export default HomeOptions;
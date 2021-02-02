import './TvSeasons.css';
import noImgPoster from './../../assets/movIMG/noImgPoster.jpg';

import axios from 'axios';
import React from 'react';
import { Col, CardImg, Jumbotron, Row } from 'reactstrap';

import SeasonInfo from './SeasonInfo/SeasonInfo';

class TvSeasons extends React.Component {

    state = {
        data: [],
        episodes: [],
        playURL: '',
    }

    id = this.props.match.params.seriesid;
    seasonid = this.props.match.params.seasonid;
    header = 'https://api.themoviedb.org/3/tv/';
    api = 'db247c4fb5373ec3fc33ba76868459bb';
    url = this.header + this.id + '/season/' + this.seasonid + '?api_key=' + this.api + '&language=en-US';
    imgEndpoint = 'https://image.tmdb.org/t/p/w500/';

    // Video URL
    vHeader = 'https://vsrequest.video/request.php?key='
    vAPI = 'dnMmYVjoshGaTtRO'
    secretKey = 'stpqicygwhuvv6z7ycwwc79tfef4st'
    vURL = this.vHeader + this.vAPI + '&secret_key=' + this.secretKey + '&video_id=' + this.id + '&tmdb=1&tv=1&s=1&ip=';

    componentDidMount() {

        axios.get('https://jsonip.com/')
            .then(res => {
                this.vURL = this.vURL + res.data.ip;

                axios.post('https://watchitserver.herokuapp.com/postURL', { "url": this.vURL })
                    .then((res) => {
                        this.setState({
                            playURL: res.data,
                        })
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            })

        axios.get(this.url)
            .then(res => {
                this.setState({
                    data: res.data,
                    episodes: res.data.episodes,
                })
            })
    }

    render() {
        const episodes = this.state.episodes ? this.state.episodes.map((content, index) => {
            return (
                <SeasonInfo key={index} data={content} id={this.id} vURL={this.state.playURL + '&e=' + (index + 1)} />
            )
        }) : null;
        return (
            <React.Fragment>
                <Jumbotron className="SeasonInfoMain">
                    <Row>
                        <Col xs="6" md="2" >
                            <CardImg
                                className="SeasonImg"
                                src={this.state.data.poster_path != null ? (this.imgEndpoint + this.state.data.poster_path) : noImgPoster} />
                        </Col>
                        <Col xs="12" md="" className="SeasonText">
                            <h4><p>{this.state.data.name}</p></h4>
                            <p>
                                {this.state.data.overview}
                            </p>
                            <p><strong>Aired On: </strong>{this.state.data.air_date}</p>
                        </Col>
                    </Row>
                </Jumbotron>
                {episodes}
            </React.Fragment>
        );
    }
}

export default TvSeasons;
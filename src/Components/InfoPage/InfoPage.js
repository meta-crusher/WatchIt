import './InfoPage.css';
import noImgBanner from './../../assets/movIMG/noImgBanner.jpg';
import noImgPoster from './../../assets/movIMG/noImgPoster.jpg';
import logo from './../../assets/logo/logo.png';

import React from 'react';
import { Container, Row, Col, CardImg, Media, Card, CardBody, CardTitle, Badge } from 'reactstrap';
import axios from 'axios';

import TrendCarousel, { } from './../Trending/TrendCarousel/TrendCarousel';
import WatchBtn from './../Watchlist/WatchBtn/WatchBtn';

class InfoPage extends React.Component {

    endpoint = 'https://api.themoviedb.org/3/';
    type = this.props.match.params.type;
    id = this.props.match.params.id;
    api = 'db247c4fb5373ec3fc33ba76868459bb';
    tail = '&language=en-US';
    similarURL = this.endpoint + this.type + '/' + this.id + '/similar?api_key=' + this.api + this.tail;
    url = this.endpoint + this.type + '/' + this.id + '?api_key=' + this.api + this.tail;
    imgEndpointPoster = 'https://image.tmdb.org/t/p/w200/';
    imgEndpointBG = 'https://image.tmdb.org/t/p/original/';
    isTV = this.type === 'tv' ? true : false;

    // Video URL
    vHeader = 'https://vsrequest.video/request.php?key='
    vAPI = 'dnMmYVjoshGaTtRO'
    secretKey = 'stpqicygwhuvv6z7ycwwc79tfef4st'
    vURL = this.vHeader + this.vAPI + '&secret_key=' + this.secretKey + '&video_id=' + this.id + '&tmdb=1&tv=' + this.isTV + '&s=0&ip=';

    state = {
        data: [],
        similarData: [],
        company: [],
        genres: [],
        seasons: [],
        collection: [],
        production: [],
        playURL: '',
    }



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

        axios.get(this.url).then(Response => {
            this.isTV ?
                this.setState({
                    data: Response.data,
                    genres: Response.data.genres,
                    company: Response.data.networks,
                    seasons: Response.data.seasons
                }) :
                this.setState({
                    data: Response.data,
                    genres: Response.data.genres,
                    production: Response.data.production_companies,

                })
        });

        axios.get(this.similarURL).then(Response => {
            this.setState(() => {
                return {
                    similarData: Response.data.results,
                }
            })
        })
    }

    render() {
        const badges = this.state.genres ? this.state.genres.map(content => {
            return (
                <Badge key={content.id} className="mr-2">{content.name}</Badge>
            );
        }) : null

        const checkMovieMedia = this.state.production[0] ? (this.state.production[0].logo_path != null ? (this.imgEndpointPoster + this.state.production[0].logo_path) : logo) : logo;
        const checkTvMedia = this.state.company[0] ? (this.state.company[0].logo_path != null ? (this.imgEndpointPoster + this.state.company[0].logo_path) : logo) : logo;
        const mediaURL = this.isTV ? checkTvMedia : checkMovieMedia;

        return (
            <React.Fragment>
                <Container fluid className="Overlap ">
                    <Row className="Back">
                        <Col md="12">
                            <Media
                                className="Banner"
                                src={this.state.data.poster_path != null ? (this.imgEndpointBG + this.state.data.poster_path) : noImgBanner} />
                        </Col>
                    </Row>
                    <Row className="Front">
                        <Col md="12">
                            <Card className={this.state.data.poster_path != null ? "Poster" : "noPosterImg"}>
                                <CardImg
                                    src={this.state.data.poster_path != null ? (this.imgEndpointPoster + this.state.data.poster_path) : noImgPoster} />
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Media className="CompanyLogo ml-auto" src={mediaURL} />
                    </Row>
                    <Container fluid className="Info">
                        <Row>
                            <Col md="2" className="ml-2 TitleInfo" tag="h3">
                                <strong><a href={this.state.data.homepage} target='blank'>
                                    {this.isTV ? this.state.data.name : this.state.data.title}
                                </a></strong>
                            </Col>
                            <Col className="ml-2 mt-2">{this.state.data.overview}</Col>
                        </Row>
                        <Row>
                            <Col md="2" className="mt-3 mr-2">
                                <Card className="ml-auto">
                                    <CardBody>
                                        {badges}
                                        <CardTitle className="mt-2"><strong>Popularity </strong><Badge color="danger">{this.state.data.vote_average}</Badge></CardTitle>
                                        {this.isTV ? <React.Fragment>
                                            <CardTitle className="mt-2"><strong>First aired</strong> <Badge>{this.state.data.first_air_date}</Badge></CardTitle>
                                            <CardTitle><strong>Last aired </strong><Badge>{this.state.data.last_air_date}</Badge></CardTitle>
                                        </React.Fragment>
                                            : <React.Fragment>
                                                <CardTitle><strong>Released </strong><Badge> {this.state.data.release_date}</Badge></CardTitle>
                                                <CardTitle><strong>Budget </strong><Badge color="success"> ${this.state.data.budget / 1000000}M</Badge></CardTitle>
                                                <CardTitle><strong>Revenue </strong><Badge> ${this.state.data.revenue / 1000000}M</Badge></CardTitle>
                                            </React.Fragment>
                                        }
                                    </CardBody>
                                </Card>
                                <WatchBtn type={this.type} id={this.id} />
                            </Col>
                            <Col>
                                {this.isTV ?
                                    <TrendCarousel name="Seasons" data={this.state.seasons} tv_id={this.id} type="seasons" />
                                    : <React.Fragment>
                                        <a href={this.state.playURL} target="blank">External</a>
                                        <div className="embed-responsive embed-responsive-16by9">
                                            <iframe className="embed-responsive-item" src={this.state.playURL} title="player"></iframe>
                                        </div>
                                    </React.Fragment>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <TrendCarousel name={"Similar " + this.type} data={this.state.similarData} type={this.type} from="info" />
                        </Row>

                    </Container>
                </Container>
            </React.Fragment>
        );
    }
}

export default InfoPage;
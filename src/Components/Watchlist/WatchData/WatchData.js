import axios from 'axios';
import React from 'react';
import noImgPoster from './../../../assets/movIMG/noImgPoster.jpg';
import { Row, Col, CardImg, ListGroupItem, Badge } from 'reactstrap';
import WatchBtn from './../WatchBtn/WatchBtn';

class WatchData extends React.Component {

    state = {
        data: [],
    }

    header = 'https://api.themoviedb.org/3/';
    type = this.props.type;
    id = this.props.id;
    api = 'db247c4fb5373ec3fc33ba76868459bb';
    url = this.header + this.type + '/' + this.id + '?api_key=' + this.api + '&language=en-US';

    componentDidMount() {
        axios.get(this.url)
            .then(res => {
                this.setState({
                    data: res.data,
                })
            })
    }

    render() {
        const imgURL = this.state.data.poster_path != null ? ('https://image.tmdb.org/t/p/w200/' + this.state.data.poster_path) : noImgPoster;
        const istv = this.type === 'tv' ? true : false;
        return (
            <ListGroupItem>
                <Row>
                    <Col xs="6" md="1">
                        <CardImg src={imgURL} />
                    </Col>
                    <Col>
                        <Row >
                            <Col md="12" className="mb-2">
                                {istv ? this.state.data.name : this.state.data.title}
                            </Col>
                            <Col md="12" className="mb-2">
                                {istv ? this.state.data.first_air_date : this.state.data.release_date}
                            </Col>
                            <Col md="12" className="mb-2">
                                <Badge>{this.state.data.vote_average}</Badge>
                            </Col>
                            <Col md="12" className="mb-2">
                                <WatchBtn type={this.type} id={this.id} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ListGroupItem>
        );
    }
}

export default WatchData;
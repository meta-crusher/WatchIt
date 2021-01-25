import './SearchOptions.css';

import React from 'react';
import { Badge, Card, CardImg, Col, ListGroupItem, Row } from 'reactstrap';

const SearchOptions = props => {
    const imgEndpoint = 'https://image.tmdb.org/t/p/w200/'
    const istv = props.data.media_type === 'tv' ? true : false;

    return (
        <ListGroupItem
            className={props.showOn === "nav" ? "SearchList" : ""}>
            <a href={'/' + props.data.media_type + '/' + props.data.id}>
                <Row>
                    <Col xs="4" md={props.showOn !== "nav" ? "1" : "4"}>
                        <Card>
                            <CardImg className={props.showOn === "nav" ? "SearchPosterImg" : ""} src={imgEndpoint + props.data.poster_path} />
                        </Card>
                    </Col>
                    <Col>
                        <Row>
                            <Col md="12">
                                {istv ? props.data.name : props.data.title}
                            </Col>
                            <Col md="12">
                                {istv ? props.data.first_air_date : props.data.release_date}
                            </Col>
                            <Col md="12">
                                {props.data.media_type.toUpperCase()}
                            </Col>
                            <Col md="12">
                                <Badge>{props.data.vote_average}</Badge>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </a>
            {props.showOn === "nav" ? <React.Fragment>
                <hr />
                <a href={'/search/' + props.query}>
                    <p className="text-center ResultTag">All Results</p>
                </a>
            </React.Fragment> : null}
        </ListGroupItem>
    );
}

export default SearchOptions;
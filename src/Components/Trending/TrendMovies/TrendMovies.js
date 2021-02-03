import './TrendMovies.css';
import noImgPoster from "./../../../assets/movIMG/noImgPoster.jpg";
import { Col, Card, CardImg, CardTitle, Button, CardImgOverlay, Row } from 'reactstrap';
import { useState } from 'react';

import WatchBtn from './../../Watchlist/WatchBtn/WatchBtn';


const TrendMovies = props => {
    const imgURL = props.img != null ? ("https://image.tmdb.org/t/p/w500/" + props.img) : noImgPoster;
    const linkURL = '/' + props.type + '/' + props.id;
    const isSeason = props.type === 'seasons' ? true : false;
    const seasonURL = props.tv_id + '/' + props.seasonNumber

    const [watch, setWatch] = useState(false);

    return (
        <Col xs="6" md="2" className="Thumbnail" onMouseEnter={() => setWatch(!watch)} onMouseLeave={() => setWatch(!watch)}>
            <Card className="ThumbnailCard" >
                {
                    watch ? <CardImgOverlay>
                        <Row>
                            <Col md="12" className="mb-md-3">
                                <a href={isSeason ? seasonURL : linkURL}>
                                    <Button className="ThumbnailBtn">Open</Button>
                                </a>
                            </Col>
                            { !isSeason ?
                            <Col md="12" className="align-bottom">
                                <WatchBtn type={props.type} id={props.id} />
                            </Col> : null
                            }
                        </Row>
                    </CardImgOverlay> : null
                }
                <CardImg src={imgURL} />
                {
                    props.img != null ? null : <CardTitle>
                        {isSeason || props.type === 'tv' ? props.seasonName : props.movieName}
                    </CardTitle>
                }
            </Card>
        </Col>
    );
}

export default TrendMovies;
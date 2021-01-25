import './TrendMovies.css';

import { Col, Card, CardText, CardBody, CardImg } from 'reactstrap';


const TrendMovies = props => {
    const imgURL = "https://image.tmdb.org/t/p/w500/" + props.img;
    const linkURL = props.from === 'info' ? props.id : (props.type + '/' + props.id);
    return (

        <Col md="2" className="Thumbnail">
            <a href={linkURL}>
                <Card className="ThumbnailCard">
                    <CardImg src={imgURL} />
                    {props.type === 'seasons' ? null :
                        <CardBody>
                            <CardText>Popularity: {props.votes * 10}%</CardText>
                        </CardBody>}
                </Card>
            </a>
        </Col>
    );
}

export default TrendMovies;
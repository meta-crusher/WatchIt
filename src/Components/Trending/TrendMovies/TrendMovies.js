import './TrendMovies.css';
import { useState } from 'react';
import { Col, Card, CardText, CardBody, CardImg } from 'reactstrap';


const TrendMovies = props => {
    const imgURL = "https://image.tmdb.org/t/p/w500/" + props.img;
    const linkURL = '/' + props.type + '/' + props.id;
    const isSeason = props.type === 'seasons' ? true : false;

    const [modal, setModal] = useState(false);

    return (
        <Col md="2" className="Thumbnail">
            <a href={isSeason ? null : linkURL}>
                <Card className="ThumbnailCard" onClick={isSeason ? ()=>setModal(!modal) : undefined}>
                    <CardImg src={imgURL} />
                    {isSeason ? null :
                        <CardBody>
                            <CardText>Popularity: {props.votes * 10}%</CardText>
                        </CardBody>}
                </Card>
            </a>
            {
                isSeason && modal ?
                    <div className="ThumbnailModal">This is modal new hehehehe.</div>
                    : null
            }
        </Col>
    );
}

export default TrendMovies;
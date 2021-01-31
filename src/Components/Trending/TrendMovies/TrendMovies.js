import './TrendMovies.css';
import { Col, Card, CardImg } from 'reactstrap';


const TrendMovies = props => {
    const imgURL = "https://image.tmdb.org/t/p/w500/" + props.img;
    const linkURL = '/' + props.type + '/' + props.id;
    const isSeason = props.type === 'seasons' ? true : false;
    const seasonURL = props.tv_id + '/' + props.seasonNumber

    return (
        <Col xs="6" md="2" className="Thumbnail">
            <a href={isSeason ? seasonURL : linkURL}>
                <Card className="ThumbnailCard" >
                    <CardImg src={imgURL} />
                    {/* {props.seasonNumber}
                    {props.seasonName} */}
                    {/* {isSeason ? null :
                        <CardBody>
                            <CardText>Popularity: {props.votes * 10}%</CardText>
                        </CardBody>} */}
                </Card>
            </a>
        </Col>
    );
}

export default TrendMovies;
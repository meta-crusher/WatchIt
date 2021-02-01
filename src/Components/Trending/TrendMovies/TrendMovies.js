import './TrendMovies.css';
import noImgPoster from "./../../../assets/movIMG/noImgPoster.jpg";
import { Col, Card, CardImg } from 'reactstrap';


const TrendMovies = props => {
    const imgURL = props.img != null ?  ("https://image.tmdb.org/t/p/w500/" + props.img) : noImgPoster;
    const linkURL = '/' + props.type + '/' + props.id;
    const isSeason = props.type === 'seasons' ? true : false;
    const seasonURL = props.tv_id + '/' + props.seasonNumber

    return (
        <Col xs="6" md="2" className="Thumbnail">
            <a href={isSeason ? seasonURL : linkURL}>
                <Card className="ThumbnailCard" >
                    <CardImg src={imgURL} />
                </Card>
            </a>
        </Col>
    );
}

export default TrendMovies;
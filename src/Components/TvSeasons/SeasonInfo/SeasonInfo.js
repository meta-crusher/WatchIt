import './SeasonInfo.css';
import noImgBanner from './../../../assets/movIMG/noImgBanner.jpg'

import {useSelector} from 'react-redux';
import { Col, CardImg, Row, Badge } from "reactstrap";

const SeasonInfo = props => {

    const theme = useSelector(state => state.theme)

    const img = props.data ? props.data.still_path : null;
    const imgURL = img != null ? ('https://image.tmdb.org/t/p/w500/' + img) : noImgBanner;
    const darkLinkStyle = { color: "white" }, liteLinkStyle = { color: "#545454" }
    const linkStyle = theme ? liteLinkStyle : darkLinkStyle;

    return (
        <Row className="epBlock">
            
            <Col xs="10" md="3" className="ml-md-5 ml-auto mr-auto">
                <CardImg className="epIMG" src={imgURL} />
            </Col>
            <Col xs="10" md="" className="episodeText ml-auto mr-auto">
                <Col xs="1"></Col>
                <Col>
                    <a href={props.vURL} target="blank" style={linkStyle}><h5>{props.data ? props.data.episode_number : null}. {props.data ? props.data.name : null}</h5></a>
                    <p>{props.data ? props.data.overview : null}</p>
                    <p>{props.data ? props.data.air_date : null}</p>
                    <Badge>{props.data ? props.data.vote_average : null}</Badge>
                </Col>
            </Col>
            
        </Row>
    );
}

export default SeasonInfo;
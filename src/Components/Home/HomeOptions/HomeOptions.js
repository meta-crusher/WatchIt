import './HomeOptions.css'

import React from 'react';
import { Col, Nav, Navbar, Row } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';

import TrendCarousel from './../../Trending/TrendCarousel/TrendCarousel';

class HomeOptions extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            "o0": [],
            "o1": [],
            "o2": [],
            "o3": [],
            currActive: 'o0',
        }
        //for Api Url
        this.header = 'https://api.themoviedb.org/3/'
        this.menu = this.props.menu === 'trending' ? 'trending/' : '';
        this.type = this.props.type + '/'
        this.api = '?api_key='+process.env.REACT_APP_API+'&language=en-US'
        this.currArr = this.props.Arr;
        this.currArrTitle = this.props.ArrTitle;
        this.url = []
        this.currArr.forEach(options => {
            this.url.push(this.header + this.menu + this.type + options + this.api)
        })
    }


    componentDidMount() {
        let i = 0
        for (const key in this.state) {
            axios.get(this.url[i]).then(response => {
                this.setState(() => {
                    return {
                        [key]: response.data.results
                    }
                })
            })
            .catch(err=>{})
            i++;
        }
    }

    showOptionsHandler(index) {
        const currActive = 'o' + index.toString();
        this.setState(() => {
            return {
                currActive: currActive,
            }
        })
    }

    render() {
        const darkOP = "DarkOptionsHome ", darkSH = "DarkSelectedHome", darkHNO = "DarkHomeNavOptions";
        const liteOP = "OptionsHome ", liteSH = "SelectedHome", liteHNO = "HomeNavOptions";
        const OP = this.props.theme ? liteOP : darkOP, SH = this.props.theme ? liteSH : darkSH, HNO = this.props.theme ? liteHNO : darkHNO;
        const showOptions = this.currArrTitle.map((content, index) => {
            return (
                <div key={index} className={OP + (this.state.currActive === ('o' + index.toString()) ? SH : "")} onClick={this.showOptionsHandler.bind(this, index)}>
                    {content}
                </div>
            );
        });

        return (
            <React.Fragment>
                <Navbar>
                    <Row>
                        <Col tag="h5" xs="12" md="12">
                            {this.props.menu === "trending" ? <div>Trending {this.props.type}</div> : <div>Watch latest {this.props.type}</div>}
                        </Col>
                        <Col md="10">
                            <Nav className={HNO}>
                                {showOptions}
                            </Nav>
                        </Col>
                    </Row>
                    <TrendCarousel data={this.state[this.state.currActive]} type={this.props.type} />
                </Navbar>
            </React.Fragment>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        theme: state.theme,
    }
}
export default connect(mapStateToProps)(HomeOptions);
import './Navigation.css';

import React from 'react';
import { Route, Link, Switch } from "react-router-dom";
import { Nav, NavItem, Button, Navbar, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import Home from './../Home/Home';
import OTT from './../OTT/OTT';
import Trending from './../Trending/Trending';
import NavOptions from './NavOptions/NavOptions';
import InfoPage from './../InfoPage/InfoPage';
import SearchBar from './Search/SearchBar';
import Search from './Search/Search';

class Navigation extends React.Component {

    state = {
        showContent: window.innerWidth >= 768 ? true : false,
    }

    showContentHandler() {
        this.setState({
            showContent: !this.state.showContent,
        })
    }

    componentDidMount() {
        window.addEventListener("resize", this.props.updateResolution.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.props.updateResolution.bind(this));
    }


    render() {
        return (
            <React.Fragment>
                <Navbar className="Nav">
                    <Nav className="container-fluid" >
                        <Col sm="" md="3" >
                            <NavItem >
                                <Link to="/">Home</Link>
                                {this.props.isMobile ? null : <Button className="float-right" onClick={this.showContentHandler.bind(this)}><i className="fas fa-bars"></i></Button>}
                            </NavItem>
                        </Col>
                        {this.state.showContent ? <React.Fragment>
                            <React.Fragment>
                                <Col sm="" md="3">
                                    <NavItem className="ml-auto mr-auto ">
                                        <SearchBar/>
                                    </NavItem>
                                </Col>
                                <Col sm="" md="4">
                                    <Row>
                                        <NavOptions name="Trending" />
                                        <NavOptions name="Netflix" />
                                        <NavOptions name="Prime" />
                                        <NavOptions name="Disney+" />
                                    </Row>
                                </Col>
                            </React.Fragment>
                        </React.Fragment> : null}
                    </Nav>
                </Navbar>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/Trending' component={Trending} />
                    <Route exact path='/Netflix' component={OTT} />
                    <Route exact path='/Prime' component={OTT} />
                    <Route exact path='/Disney+' component={OTT} />
                    <Route exact path='/Search/:query' component={Search}/>
                    <Route exact path ='/:type/:id' component={InfoPage}/>
                </Switch>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isMobile: state.isMobile,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateResolution: () => dispatch({ type: "CHANGE" }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
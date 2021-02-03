import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import WatchData from './WatchData/WatchData';

const Watchlist = () => {

    const [show, setShow] = useState('movie')
    const [dropdown, setDropdown] = useState(false);


    const movTemp = JSON.parse(localStorage.getItem('movie'))
    const tvTemp = JSON.parse(localStorage.getItem('tv'))

    const m = movTemp !== null ? Object.keys(movTemp).map((key) => {
        return (
            <WatchData id={key} type="movie" />
        );
    }) : null;
    const t = tvTemp !== null ? Object.keys(tvTemp).map((key, index) => {
        return (
            <WatchData key={key} id={key} type="tv" />
        );
    }) : null;
    return (
        <React.Fragment>
            <Row className="mt-3 ml-3 mb-3">
                <Col tag="h3">
                    Select your added
                </Col>
                <Col md="9">
                    <Dropdown isOpen={dropdown} toggle={() => setDropdown(!dropdown)}>
                        <DropdownToggle caret>
                            {show.toUpperCase()}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Select Type</DropdownItem>
                            <DropdownItem onClick={() => setShow('movie')}>MOVIE</DropdownItem>
                            <DropdownItem onClick={() => setShow('tv')}>TV</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </Row>
            {
                show === 'movie' ? m : t
            }
        </React.Fragment>
    );
}

export default Watchlist;
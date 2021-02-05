import './NavOptions.css'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Col, NavItem } from 'reactstrap';

const NavOptions = props => {

    return (
        <Col sm="" md="3" >
            <NavLink to={"/" + props.name}>
                <NavItem className="activeInherit text-md-center">
                    {props.name}
                </NavItem>
            </NavLink>
        </Col>
    );
}

export default NavOptions;
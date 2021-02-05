import React, { useState } from 'react';
import { Button, Tooltip } from 'reactstrap';

const addHandler = (type, id) => {


    if (localStorage.getItem(type) === null) {
        let itemid = {}
        itemid[id] = 1;
        localStorage.setItem(type, JSON.stringify(itemid))
    }
    else {
        let temp = JSON.parse(localStorage.getItem(type));
        temp[id] = 1;
        localStorage.setItem(type, JSON.stringify(temp))
    }

}

const removeHandler = (type, id) => {
    let temp = JSON.parse(localStorage.getItem(type));
    delete temp[id];
    localStorage.setItem(type, JSON.stringify(temp));
}

const WatchBtn = props => {

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    let watchArr = JSON.parse(localStorage.getItem(props.type))
    watchArr = (watchArr !== null && props.id in watchArr) ? false : true
    const [add, setAdd] = useState(watchArr);

    return (
        <React.Fragment>
            <Button id="WishList"
                className="ThumbnailBtn"
                onClick={add ? () => {
                    setAdd(!add)
                    addHandler(props.type, props.id)
                }
                    : () => {
                        setAdd(!add)
                        removeHandler(props.type, props.id)
                    }
                }>
                {add ? <div>Add <i className="fas fa-plus-square"></i></div> : <div>Remove <i className="fas fa-trash-alt"></i></div>}
                <Tooltip placement="bottom" isOpen={tooltipOpen} target="WishList" toggle={toggle}>
                    Add/Remove items from Wishlist
                </Tooltip>
            </Button>
        </React.Fragment>
    );
}

export default WatchBtn;
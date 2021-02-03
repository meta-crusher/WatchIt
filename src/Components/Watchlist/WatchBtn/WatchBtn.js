import { useState } from 'react';
import { Button } from 'reactstrap';

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

    let watchArr = JSON.parse(localStorage.getItem(props.type))
    watchArr = (watchArr !== null && props.id in watchArr) ? false : true
    const [add, setAdd] = useState(watchArr);

    return (
        <Button
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
            {add ? <div>Add</div> : <div>Remove</div>}
        </Button>
    );
}

export default WatchBtn;
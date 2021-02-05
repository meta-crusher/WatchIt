import './Theme.css';

import { useState } from "react";
import { useDispatch } from 'react-redux';
import { Button } from "reactstrap"

const switchHandler = (val) => {
    val ? localStorage.setItem('theme', 'dark') : localStorage.setItem('theme', 'lite')
}

const Theme = () => {

    const dispatch = useDispatch();

    let initialTheme = localStorage.getItem('theme');
    initialTheme = initialTheme === 'lite' ? true : false
    const [switchDark, setSwitchDark] = useState(initialTheme);

    return (
        <>
            <label className="switch">
                <input type="checkbox" checked={switchDark}
                    onClick={() => {
                        setSwitchDark(!switchDark)
                        dispatch({ type: "THEME" })
                        switchHandler(switchDark)
                    }} />
                <span className="slider round"></span>
            </label>

            {/* <Button
                onClick={() => {
                    setSwitchDark(!switchDark)
                    dispatch({ type: "THEME" })
                    switchHandler(switchDark)
                }}>
                Switch
        </Button> */}
        </>
    );
}

export default Theme;
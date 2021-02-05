if (localStorage.getItem('theme') === null) {
    localStorage.setItem('theme', 'lite')
}

const style = localStorage.getItem('theme') === 'lite' ? false : true;

const initialState = {
    isMobile: window.innerWidth >= 768 ? true : false,
    theme: style,
}


const reducer = (state = initialState, action) => {

    if (action.type === "CHANGE") {
        return (
            state = {
                ...state, isMobile: window.innerWidth >= 768 ? true : false,
            }
        )
    }
    if (action.type === 'THEME') {
        return (
            state = {
                ...state, theme: !state.theme,
            }
        )
    }
    return state;
}

export default reducer;
const initialState = {
    isMobile: window.innerWidth >= 768 ? true : false,
}

const reducer = (state = initialState, action) => {

    if (action.type === "CHANGE") {
        return {
            isMobile: window.innerWidth >= 768 ? true : false
        }
    }
    return state;
}

export default reducer;
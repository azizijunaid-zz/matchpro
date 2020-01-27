import {
    FETCH_LANGUAGES,
    SET_LANGUAGE,
} from '../actions/languages'

const initialState = {
    languages: [],
    selected: {

    },
};


export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LANGUAGES:
            return {
                ...state,
                languages: action.data,
            };

        case SET_LANGUAGE:
            return {
                ...state,
                selected: action.data,
            };

        default:
            return state
    }
}
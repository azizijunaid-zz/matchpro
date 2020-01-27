import * as actions from "../actions";


const initialState = {
    items: [],
    categories: [],
    favourites: [],
    user: null,
    token: null,
};

export default function counter(state = initialState, action = {}) {


    switch (action.type) {


        case actions.SET_CATEGORIES:


            return {
                ...state,
                categories: action.payload,
            };


        case actions.SET_ITEMS:


            return {
                ...state,
                items: action.payload,
            };


        default:
            return state;


    }


}

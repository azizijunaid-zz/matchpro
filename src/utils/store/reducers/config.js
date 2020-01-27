import * as actions from "../actions";

const initialState = {
    data: [],
};

export default function favourite(state = initialState, action = {}) {

    switch (action.type) {

        case actions.CONFIG_SET: {
            let data = action.payload;

            return {
                ...state,
                data: data,
            }

        }


        default:
            return state;


    }


}

import * as actions from "../actions";
import _ from "lodash";

const initialState = {
    data: [],
};

export default function favourite(state = initialState, action = {}) {


    switch (action.type) {


        case actions.FAVOURITE_ADD: {
            const payload = action.payload;

            let addedItem = payload;

            //check if the action id exists in the addedItems
            let existed_item = state.data.find(item => payload.id === item.id);

            if (existed_item) {
                return;
            }
            else {
                return {
                    ...state,
                    data: [...state.data, addedItem],
                }

            }
        }


        case actions.FAVOURITE_REMOVE: {
            const payload = action.payload;

            let addedItem = payload;

            //check if the action id exists in the addedItems
            let existed_item = state.data.find(item => payload.id === item.id);

            if (existed_item) {


                _.remove(state.data, {
                    id: existed_item.id
                });

                return {
                    ...state,
                }
            }

        }

        default:
            return state;


    }


}

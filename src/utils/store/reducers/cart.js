import * as actions from "../actions";
import _ from "lodash";


const initialState = {
    data: [],
    total: 0,
};

export default function cart(state = initialState, action = {}) {


    switch (action.type) {


        case actions.CART_ADD: {
            const payload = action.payload;

            let addedItem = payload;

            //check if the action id exists in the addedItems
            let existed_item = state.data.find(item => payload.id === item.id);

            if (existed_item) {
                addedItem.quantity += 1;

                return {
                    ...state,
                    total: state.total + addedItem.price
                }
            }
            else {
                addedItem.quantity = 1;
                //calculating the total
                let newTotal = state.total + addedItem.price;

                return {
                    ...state,
                    data: [...state.data, addedItem],
                    total: newTotal
                }

            }
        }


        case actions.CART_REMOVE: {
            const payload = action.payload;

            let addedItem = payload;

            //check if the action id exists in the addedItems
            let existed_item = state.data.find(item => payload.id === item.id);

            if (existed_item) {

                if(existed_item.quantity <= 1){
                    _.remove(state.data, {
                        id: existed_item.id
                    });
                }

                addedItem.quantity -= 1;

                return {
                    ...state,
                    total: state.total - addedItem.price
                }
            }

        }

        default:
            return state;


    }


}

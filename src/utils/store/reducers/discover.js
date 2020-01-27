import {
    ADD_DISCOVER,
    FETCH_DISCOVER, REMOVE_DISCOVER,
} from '../actions/discover'
import _ from "lodash";
export default (discover = [], action) => {
    switch (action.type) {
        case FETCH_DISCOVER:
            return action.discover;

        case ADD_DISCOVER:
            return [ action.discover, ...discover ];

        case REMOVE_DISCOVER:
            _.remove(discover, function(item){

                return item.id === action.discover;
            });
            return discover;

        default:
            return discover
    }
}
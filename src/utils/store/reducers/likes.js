import {
    FETCH_LIKES,
    ADD_LIKE,
} from '../actions/likes'

export default (likes = [], action) => {
    switch (action.type) {
        case FETCH_LIKES:
            return action.likes;

        case ADD_LIKE:
            return [ action.like, ...likes ];

        default:
            return likes
    }
}
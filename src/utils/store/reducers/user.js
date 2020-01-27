import {
    USER_LOGIN,
    FETCH_USER,
    USER_LOGOUT,
    VIDEO_CALL_OPPONENTS,
    USER_IS_LOGGING,
    USER_SET_SESSION,
    USER_SET_LOCATION
} from '../actions/user'

const initialState = {
    userIsLogging: false,
    user: null,
    userSession: null,
    opponentsIds: null,
    location: {
        lat:0,
        lng:0,
    }
};

export default (state = null, action) => {
	switch (action.type) {
		case USER_LOGIN:
			return { ...action.user }
        case FETCH_USER:
            return {...state, ...action.user }
		case USER_LOGOUT:
			return null
        case VIDEO_CALL_OPPONENTS: {
            let res = {
                ...state,
                opponentsIds: action.opponentsIds,
            }
            return res;
        }
        case USER_SET_LOCATION: {
            let res = {
                ...state,
                location: action.location,
            }
            return res;
        }
        case USER_SET_SESSION: {
            let res = {
                ...state,
                userSession: action.session,
            }
            return res;
        }
        case USER_IS_LOGGING: {
            return {
                ...state,
                userIsLogging: action.userIsLogging,
            }
        }
		default:
			return state
	}
}

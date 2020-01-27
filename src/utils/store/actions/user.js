export const USER_LOGIN = 'USER_LOGIN';
export const FETCH_USER = 'FETCH_USER';
export const USER_LOGOUT = 'USER_LOGOUT';
export const VIDEO_CALL_OPPONENTS = 'VIDEO_CALL_OPPONENTS';
export const USER_IS_LOGGING = 'USER_IS_LOGGING';
export const USER_SET_SESSION = 'USER_SET_SESSION';
export const USER_SET_LOCATION = 'USER_SET_LOCATION';

export const userLogin = user => ({ type: USER_LOGIN, user: user })

export const fetchUser = user => ({ type: FETCH_USER, user: user })
export const userLogout = () => ({ type: USER_LOGOUT })
export const videoCallOpponentsIds = opponentsIds => ({ type: VIDEO_CALL_OPPONENTS, opponentsIds: opponentsIds })
export const userIsLogging = userIsLogging => ({ type: USER_IS_LOGGING, userIsLogging: userIsLogging });
export const userSetSession = session => ({ type: USER_SET_SESSION, session: session });
export const userSetLocation = location => ({ type: USER_SET_LOCATION, location: location });

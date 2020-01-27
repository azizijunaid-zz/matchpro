export const FETCH_MATCHES = 'FETCH_MATCHES';
export const ADD_MATCH = 'ADD_MATCH';
export const SORT_MATCHES = 'SORT_MATCHS';

export const fetchMatches = matches => ({ type: FETCH_MATCHES, matches: matches });
export const addNewMatch = match => ({ type: ADD_MATCH, match: match });
export const sortMatches = (message, count) => ({ type: SORT_MATCHES, message: message, count: count });

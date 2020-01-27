export const FETCH_DISCOVER = 'FETCH_DISCOVER';
export const ADD_DISCOVER = 'ADD_DISCOVER';
export const REMOVE_DISCOVER = 'REMOVE_DISCOVER';

export const fetchDiscover = discover => ({ type: FETCH_DISCOVER, discover: discover });
export const addDiscover = discover => ({ type: ADD_DISCOVER, discover: discover });
export const removeDiscover = discover => ({ type: REMOVE_DISCOVER, discover: discover });

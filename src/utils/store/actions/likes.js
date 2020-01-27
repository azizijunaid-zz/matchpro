export const FETCH_LIKES = 'FETCH_LIKES';
export const ADD_LIKE = 'ADD_LIKE';

export const fetchLikes = likes => ({ type: FETCH_LIKES, likes: likes });
export const addNewLike = like => ({ type: ADD_LIKE, like: like });

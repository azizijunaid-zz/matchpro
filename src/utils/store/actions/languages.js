export const FETCH_LANGUAGES = 'FETCH_LANGUAGES';
export const SET_LANGUAGE = 'SET_LANGUAGE';

export const fetchLanguages = languages => ({ type: FETCH_LANGUAGES, data: languages });
export const setLanguage = language => ({ type: SET_LANGUAGE, data: language });

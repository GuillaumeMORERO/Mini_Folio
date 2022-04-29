export const SET_LOADING_FILM = 'SET_LOADING_FILM';
export const SET_QUERY_FILM = 'SET_QUERY_FILM';
export const REQUEST_FILM_LIST = 'REQUEST_FILM_LIST';
export const SET_FILM_LIST = 'SET_FILM_LIST';
export const REQUEST_FILM_DETAIL = 'REQUEST_FILM_DETAIL';
export const SET_FILM_DETAIL = 'SET_FILM_DETAIL';
export const MODAL_FILM_DETAIL = 'MODAL_FILM_DETAIL';

export const setQueryFilm = (query) => {
  return { type: SET_QUERY_FILM, query };
}

export const setLoadingFilm = (bool) => {
  return { type: SET_LOADING_FILM, bool };
}
export const requestFilmList = (query) => {
  return { type: REQUEST_FILM_LIST, query };
};
export const setFilmList = (data, page, title) => {
  return { type: SET_FILM_LIST, data, page, title };
};

export const requestFilmDetail = (filmID) => {
  return { type: REQUEST_FILM_DETAIL, filmID };
};
export const setFilmDetail = (data) => {
  return { type: SET_FILM_DETAIL, data };
};

export const modalFilmDetail = (bool) => {
  return { type: MODAL_FILM_DETAIL, bool };
};
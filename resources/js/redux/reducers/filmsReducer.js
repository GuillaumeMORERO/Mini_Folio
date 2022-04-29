import { SET_FILM_LIST, MODAL_FILM_DETAIL, SET_FILM_DETAIL, SET_LOADING_FILM, SET_QUERY_FILM } from '../actions/filmsActions';

const initialState = {
    films: [],
    total_pages: 0,
    total_results: 0,
    isModalFilmOpen: false,
    filmID: 0,
    filmDetail: {},
    loading: false,
    query: {title: '', page: 1}
};

export default (state = initialState, action) => {

  switch (action.type) {
    case SET_QUERY_FILM: {
      return {
        ...state,
        query: action.query
      };
    } 
    case SET_LOADING_FILM: {
      return {
        ...state,
        loading: action.bool
      };
    } 
    case SET_FILM_LIST: {
      return {
        ...state,
        films: action.data.results,
        total_pages: action.data.total_pages,
        total_results: action.data.total_results,
        query: {title: action.title, page:action.page},
        loading: false
      };
    }   
    case SET_FILM_DETAIL: {
      let id = action.bool ? action.filmID : 0;
      return {
        ...state,
        filmDetail: action.data,
        isModalFilmOpen: true,
        loading: false
      };
    } 
    case MODAL_FILM_DETAIL: {
      return {
        ...state,
        isModalFilmOpen: action.bool,
        filmDetail: {}
      };
    }
    default: {
      return state;
    }
  }
}
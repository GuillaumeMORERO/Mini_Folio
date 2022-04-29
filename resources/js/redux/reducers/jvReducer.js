import { SET_JV_LIST, MODAL_JV_DETAIL, SET_JV_DETAIL, SET_LOADING_JV } from '../actions/jvActions';

const initialState = {
    jv: [],
    total_pages: 0,
    total_results: 0,
    isModalJvOpen: false,
    jvID: 0,
    jvDetail: {},
    loading: false,
    query: {title:'', author:'', page:1}
};

export default (state = initialState, action) => {

  switch (action.type) {
    // case SET_QUERY_JV: {
    //   return {
    //     ...state,
    //     query: action.query
    //   };
    // } 
    case SET_LOADING_JV: {
      return {
        ...state,
        loading: action.bool
      };
    }
    case SET_JV_LIST: {
      return {
        ...state,
        jv: action.data.data,
        total_pages: Math.ceil(action.data.pagination.total / action.data.pagination.limit),
        total_results: action.data.pagination.total,
        // query: {title: action.title, author: action.author, page: action.page},
        loading: false
      };
    }   
    case SET_JV_DETAIL: {
      let id = action.bool ? action.jvID : 0;
      return {
        ...state,
        jvDetail: action.data,
        isModalJvOpen: true,
        loading: false
      };
    } 
    case MODAL_JV_DETAIL: {
      return {
        ...state,
        isModalJvOpen: action.bool,
        jvDetail: {}
      };
    }
    default: {
      return state;
    }
  }
}
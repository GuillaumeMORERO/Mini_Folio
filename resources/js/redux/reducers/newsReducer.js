import { SET_NEWS_LIST, MODAL_NEWS_DETAIL, SET_NEWS_DETAIL, SET_LOADING_NEWS } from '../actions/newsActions';

const initialState = {
    news: [],
    total_pages: 0,
    total_results: 0,
    isModalNewsOpen: false,
    newsID: 0,
    newsDetail: {},
    loading: false,
    query: {title:'', author:'', page:1}
};

export default (state = initialState, action) => {

  switch (action.type) {
    // case SET_QUERY_NEWS: {
    //   return {
    //     ...state,
    //     query: action.query
    //   };
    // } 
    case SET_LOADING_NEWS: {
      return {
        ...state,
        loading: action.bool
      };
    }
    case SET_NEWS_LIST: {
      // console.log('action.data = ', action.data.articles.length)
      return {
        ...state,
        news: action.data.articles,
        total_pages: Math.ceil(action.data.totalResults / action.data.articles.length),
        total_results: action.data.totalResults,
        // query: {title: action.title, author: action.author, page: action.page},
        loading: false
      };
    }   
    case SET_NEWS_DETAIL: {
      let id = action.bool ? action.newsID : 0;
      return {
        ...state,
        newsDetail: action.data,
        isModalNewsOpen: true,
        loading: false
      };
    } 
    case MODAL_NEWS_DETAIL: {
      return {
        ...state,
        isModalNewsOpen: action.bool,
        newsDetail: {}
      };
    }
    default: {
      return state;
    }
  }
}
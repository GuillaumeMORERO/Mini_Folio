import { SET_BOOK_LIST, MODAL_BOOK_DETAIL, SET_BOOK_DETAIL, SET_LOADING_BOOK, SET_QUERY_BOOK } from '../actions/booksActions';

const initialState = {
    books: [],
    total_pages: 0,
    total_results: 0,
    isModalBookOpen: false,
    bookID: 0,
    bookDetail: {},
    loading: false,
    query: {title:'', author:'', page:1}
};

export default (state = initialState, action) => {

  switch (action.type) {
    case SET_QUERY_BOOK: {
      return {
        ...state,
        query: action.query
      };
    } 
    case SET_LOADING_BOOK: {
      return {
        ...state,
        loading: action.bool
      };
    }
    case SET_BOOK_LIST: {
      return {
        ...state,
        books: action.data.items,
        total_pages: Math.ceil(action.data.totalItems / 10),
        total_results: action.data.totalItems,
        query: {title: action.title, author: action.author, page: action.page},
        loading: false
      };
    }   
    case SET_BOOK_DETAIL: {
      let id = action.bool ? action.bookID : 0;
      return {
        ...state,
        bookDetail: action.data,
        isModalBookOpen: true,
        loading: false
      };
    } 
    case MODAL_BOOK_DETAIL: {
      return {
        ...state,
        isModalBookOpen: action.bool,
        bookDetail: {}
      };
    }
    default: {
      return state;
    }
  }
}
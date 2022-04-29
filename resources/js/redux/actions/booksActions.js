export const SET_QUERY_BOOK = 'SET_QUERY_BOOK';
export const SET_LOADING_BOOK = 'SET_LOADING_BOOK';
export const REQUEST_BOOK_LIST = 'REQUEST_BOOK_LIST';
export const SET_BOOK_LIST = 'SET_BOOK_LIST';
export const REQUEST_BOOK_DETAIL = 'REQUEST_BOOK_DETAIL';
export const SET_BOOK_DETAIL = 'SET_BOOK_DETAIL';
export const MODAL_BOOK_DETAIL = 'MODAL_BOOK_DETAIL';

export const setQueryBook = (query) => {
  return { type: SET_QUERY_BOOK, query };
}

export const setLoadingBook = (bool) => {
  return { type: SET_LOADING_BOOK, bool };
}
export const requestBookList = (query) => {
  return { type: REQUEST_BOOK_LIST, query };
};
export const setBookList = (data, page, title, author) => {
  return { type: SET_BOOK_LIST, data, page, title, author };
};

export const requestBookDetail = (bookID) => {
  return { type: REQUEST_BOOK_DETAIL, bookID };
};
export const setBookDetail = (data) => {
  return { type: SET_BOOK_DETAIL, data };
};

export const modalBookDetail = (bool) => {
  return { type: MODAL_BOOK_DETAIL, bool };
};
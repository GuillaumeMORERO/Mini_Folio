export const SET_LOADING_NEWS = 'SET_LOADING_NEWS';
export const REQUEST_NEWS_LIST = 'REQUEST_NEWS_LIST';
export const SET_NEWS_LIST = 'SET_NEWS_LIST';
export const REQUEST_NEWS_DETAIL = 'REQUEST_NEWS_DETAIL';
export const SET_NEWS_DETAIL = 'SET_NEWS_DETAIL';
export const MODAL_NEWS_DETAIL = 'MODAL_NEWS_DETAIL';


export const setLoadingNews = (bool) => {
  return { type: SET_LOADING_NEWS, bool };
}
export const requestNewsList = (query) => {
  return { type: REQUEST_NEWS_LIST, query };
};
export const setNewsList = (data) => {
  return { type: SET_NEWS_LIST, data };
};

export const requestNewsDetail = (newsID) => {
  return { type: REQUEST_NEWS_DETAIL, newsID };
};
export const setNewsDetail = (data) => {
  return { type: SET_NEWS_DETAIL, data };
};

export const modalNewsDetail = (bool) => {
  return { type: MODAL_NEWS_DETAIL, bool };
};
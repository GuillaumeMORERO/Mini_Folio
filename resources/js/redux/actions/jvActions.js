export const SET_LOADING_JV = 'SET_LOADING_JV';
export const REQUEST_JV_LIST = 'REQUEST_JV_LIST';
export const SET_JV_LIST = 'SET_JV_LIST';
export const REQUEST_JV_DETAIL = 'REQUEST_JV_DETAIL';
export const SET_JV_DETAIL = 'SET_JV_DETAIL';
export const MODAL_JV_DETAIL = 'MODAL_JV_DETAIL';


export const setLoadingJv = (bool) => {
  return { type: SET_LOADING_JV, bool };
}
export const requestJvList = (query) => {
  return { type: REQUEST_JV_LIST, query };
};
export const setJvList = (data) => {
  return { type: SET_JV_LIST, data };
};

export const requestJvDetail = (jvID) => {
  return { type: REQUEST_JV_DETAIL, jvID };
};
export const setJvDetail = (data) => {
  return { type: SET_JV_DETAIL, data };
};

export const modalJvDetail = (bool) => {
  return { type: MODAL_JV_DETAIL, bool };
};
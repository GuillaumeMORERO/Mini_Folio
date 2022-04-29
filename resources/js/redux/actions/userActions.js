export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGGEDOUT_USER = 'LOGGEDOUT_USER';
export const SET_SUCCESS = 'SET_SUCCESS';
export const SET_ERROR = 'SET_ERROR';
export const RESET_OPENMODAL = 'RESET_OPENMODAL';
export const REGISTER_USER = 'REGISTER_USER';
export const POST_USER_DATA = 'POST_USER_DATA';
export const WRITE_USER_DATA = 'WRITE_USER_DATA';

export const writeUserData = (data) => {
  return { type: WRITE_USER_DATA, data };
};

export const loginUser = (data) => {
  return { type: LOGIN_USER, data };
};

export const setSuccess = (data) => {
  return { type: SET_SUCCESS, data };
};

export const logoutUser = () => {
  return { type: LOGOUT_USER };
};
export const loggedOutUser = () => {
  return { type: LOGGEDOUT_USER };
};

export const registerUser = (data) => {
  return { type: REGISTER_USER, data };
};

export const setError = (data) => {
  return { type: SET_ERROR, data };
};

export const resetOpenModal = () => {
  return { type: RESET_OPENMODAL };
};

export const postUserData = (data) => {
  return { type: POST_USER_DATA, data };
};

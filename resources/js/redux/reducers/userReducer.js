import { 
  LOGGEDOUT_USER,
  SET_SUCCESS,
  SET_ERROR,
  RESET_OPENMODAL,
  WRITE_USER_DATA
} from '../actions/userActions';

const initialState = {
    name: '',
    email: '',
    num_tel: '',
    avatar_url: '',
    isMobile: true,
    loggedin: false,
    openModal: {type: '', open: false},
};

export default (state = initialState, action) => {

  switch (action.type) {
    case WRITE_USER_DATA: {
      return {
        ...state,
        name: action.data.name,
        email: action.data.email,
        num_tel: action.data.num_tel,
        isMobile: action.data.isMobile,
        loggedin: true,
      };
    }
    case SET_SUCCESS: {
      return {
        ...state,
        // [action.data.cat]: {'title': action.data.title, 'message': action.data.message},
        openModal: {'type': action.data.cat, 'open': true, 'title': action.data.title, 'message': action.data.message},
      };
    }
    case LOGGEDOUT_USER: {
      return {
        ...state,
        name: '',
        email: '',
        num_tel: '',
        isMobile: true,
        loggedin: false,
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        // [action.data.cat]: {'title': action.data.title, 'message': action.data.message},
        openModal: {'type': action.data.cat, 'open': true, 'title': action.data.title, 'message': action.data.message},
      };
    }
    case RESET_OPENMODAL: {
      return {
        ...state,
        openModal: {type: '', open: false},
        loginError: {},
        loginSuccess: {},
        logoutError: {},
        logoutSuccess: {},
        registerError: {},
        registerSuccess: {},
        updateError: {},
        updateSuccess: {},
        filmError: {}
      };
    }
    default: {
      return state;
    }
  }
}
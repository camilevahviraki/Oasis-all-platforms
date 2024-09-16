import Upload from '../../../utils/lib/upload';
import {saveToStorage, getFromStorage, clearStorage} from '../../localStorage';

const SIGNUP_USER = '/redux/authentication/SIGNUP_USER';
const LOGIN_USER = '/redux/authentication/LOGIN_USER';
const USER_RESET_PASSWORD = '/redux/authentication/USER_RESET_PASSWORD';
const USER_UPDATE_ACCOUNT = '/redux/authentication/USER_UPDATE_ACCOUNT';
const USER_LOGOUT = '/redux/authentication/USER_LOGOUT';
const USER_DELETE_ACCOUNT = '/redux/authentication/USER_DELETE_ACCOUNT';
const USER_UPDATE_PASSWORD = '/redux/authentication/USER_UPDATE_PASSWORD';

const authenticationReducer = (
  state = { user: {} }, action,
) => {
  switch (action.type) {
    case SIGNUP_USER: {
      saveToStorage(action.data, 'userCredentials');
      return action.data;
    }
    case LOGIN_USER: {
      saveToStorage(action.data, 'userCredentials');
      return action.data;
    }
    case USER_RESET_PASSWORD: {
      return action.data;
    }
    case USER_UPDATE_ACCOUNT: {
      return action.data;
    }
    case USER_LOGOUT: {
      clearStorage();
      return { user: {} };
    }
    case USER_DELETE_ACCOUNT: {
      clearStorage();
      return { user: {} };
    }
    case USER_UPDATE_PASSWORD: {
      return action.data;
    }
    default: {
      const savedData = getFromStorage('userCredentials');
      if (savedData && savedData !== 'null') {
        return savedData;
      }
      return state;
    }
  }
};

export const signUpUser = (userData) => (dispatch) => {
  Upload({
    data: userData,
    endPoint: 'users',
    dispatcthAuthResponse: (data) => dispatch({ type: SIGNUP_USER, data }),
  });
};

export const loginUser = (userData) => (dispatch) => {
  Upload({
    data: userData,
    endPoint: 'users/sign_in',
    dispatcthAuthResponse: (data) => dispatch({ type: LOGIN_USER, data }),
  });
};

export const userResetPassword = (userData) => (dispatch) => {
  Upload({
    data: userData,
    endPoint: 'users/password',
    dispatcthAuthResponse: (data) => dispatch({ type: USER_RESET_PASSWORD, data }),
  });
};

export const userUpdateAccount = (userData) => (dispatch) => {
  Upload({
    data: userData,
    endPoint: 'users',
    method: 'PUT',
    dispatcthAuthResponse: (data) => dispatch({ type: USER_UPDATE_ACCOUNT, data }),
  });
};

export const userLogout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
};

export const userDeleteAccount = (userData) => (dispatch) => {
  Upload({
    data: userData,
    endPoint: 'users',
    method: 'DELETE',
    dispatcthAuthResponse: (data) => dispatch({ type: USER_DELETE_ACCOUNT, data }),
  });
};

export const userUpdatePassword = (userData) => (dispatch) => {
  Upload({
    data: userData,
    endPoint: 'users/password',
    method: 'PUT',
    dispatcthAuthResponse: (data) => dispatch({ type: USER_UPDATE_PASSWORD, data }),
  });
};

export default authenticationReducer;

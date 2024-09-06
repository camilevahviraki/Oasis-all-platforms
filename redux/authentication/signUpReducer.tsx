import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Upload from '../upload';

const SIGNUP_USER = '/redux/authentication/SIGNUP_USER';
const LOGIN_USER = '/redux/authentication/LOGIN_USER';
const USER_RESET_PASSWORD = '/redux/authentication/USER_RESET_PASSWORD';
const USER_UPDATE_ACCOUNT = '/redux/authentication/USER_UPDATE_ACCOUNT';
const USER_LOGOUT = '/redux/authentication/USER_LOGOUT';
const USER_DELETE_ACCOUNT = '/redux/authentication/USER_DELETE_ACCOUNT';
const USER_UPDATE_PASSWORD = '/redux/authentication/USER_UPDATE_PASSWORD';

const initialState = { user: {} };

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER:
    case LOGIN_USER:
    case USER_UPDATE_ACCOUNT:
    case USER_UPDATE_PASSWORD:
    case USER_RESET_PASSWORD:
      saveToStorage(action.data);
      return action.data;
    
    case USER_LOGOUT:
    case USER_DELETE_ACCOUNT:
      clearStorage();
      return { user: {} };

    default:
      return state;
  }
};

export const signUpUser = (userData) => async (dispatch) => {
  const response = await Upload({
    data: userData,
    endPoint: 'users',
  });
  dispatch({ type: SIGNUP_USER, data: response });
};

export const loginUser = (userData) => async (dispatch) => {
  const response = await Upload({
    data: userData,
    endPoint: 'users/sign_in',
  });
  dispatch({ type: LOGIN_USER, data: response });
};

export const userResetPassword = (userData) => async (dispatch) => {
  const response = await Upload({
    data: userData,
    endPoint: 'users/password',
  });
  dispatch({ type: USER_RESET_PASSWORD, data: response });
};

export const userUpdateAccount = (userData) => async (dispatch) => {
  const response = await Upload({
    data: userData,
    endPoint: 'users',
    method: axios.put,
  });
  dispatch({ type: USER_UPDATE_ACCOUNT, data: response });
};

export const userLogout = () => async (dispatch) => {
  await clearStorage();
  dispatch({ type: USER_LOGOUT });
};

export const userDeleteAccount = (userData) => async (dispatch) => {
  const response = await Upload({
    data: userData,
    endPoint: 'users',
    method: axios.delete,
  });
  await clearStorage();
  dispatch({ type: USER_DELETE_ACCOUNT, data: response });
};

export const userUpdatePassword = (userData) => async (dispatch) => {
  const response = await Upload({
    data: userData,
    endPoint: 'users/password',
    method: axios.put,
  });
  dispatch({ type: USER_UPDATE_PASSWORD, data: response });
};

const saveToStorage = async (data) => {
  try {
    await AsyncStorage.setItem('userCredentials', JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save user data to storage', error);
  }
};

const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Failed to clear storage', error);
  }
};

export default authenticationReducer;

// store.js
import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './reducers/user/authentication';

export const store = configureStore({
  reducer: {
    authenticationReducer,
  },
});

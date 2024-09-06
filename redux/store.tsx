import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './authentication/signUpReducer';

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});

export default store;

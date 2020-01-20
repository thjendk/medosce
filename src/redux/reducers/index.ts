import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import quizReducer from './quiz';
import adminReducer from './admin';

const rootReducer = combineReducers({
  auth: authReducer.reducer,
  quiz: quizReducer.reducer,
  admin: adminReducer.reducer
});

export type ReduxState = ReturnType<typeof rootReducer>;

export default rootReducer;

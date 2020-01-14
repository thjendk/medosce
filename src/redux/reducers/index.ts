import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import quizReducer from './quiz';

const rootReducer = combineReducers({
  auth: authReducer.reducer,
  quiz: quizReducer.reducer
});

export type ReduxState = ReturnType<typeof rootReducer>;

export default rootReducer;

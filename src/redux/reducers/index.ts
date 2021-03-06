import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import quizReducer from './quiz';
import adminReducer from './admin';
import settingsReducer from './settings';
import selectionReducer from './selection';

const rootReducer = combineReducers({
  auth: authReducer.reducer,
  quiz: quizReducer.reducer,
  admin: adminReducer.reducer,
  settings: settingsReducer.reducer,
  selection: selectionReducer.reducer
});

export type ReduxState = ReturnType<typeof rootReducer>;

export default rootReducer;

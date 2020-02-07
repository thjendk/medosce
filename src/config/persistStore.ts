import { persistReducer, createMigrate } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import rootReducer, { ReduxState } from 'redux/reducers';
import { getDefaultMiddleware, configureStore } from '@reduxjs/toolkit';

const migrations: any = {};

const persistConfig = {
  key: 'medOSCE',
  storage: storage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
  version: 11,
  migrate: createMigrate(migrations),
  blacklist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({ serializableCheck: false })
});

export default store;

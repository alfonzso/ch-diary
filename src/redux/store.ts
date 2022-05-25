import { Action, combineReducers, configureStore, getDefaultMiddleware, ThunkAction } from "@reduxjs/toolkit";
import userDataReducer from "./user"
import importIFReducer from "./importInterFood"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import thunk from 'redux-thunk'

// import logger from 'redux-logger';

// const middleware = [...getDefaultMiddleware() ];

const reducers = combineReducers({
  //...
  //  reducer: persistedReducer,
  user: userDataReducer,
  importIF: importIFReducer
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  // reducer: {
  // user: userDataReducer
  // },
  middleware: [thunk]
  // (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// export type AppThunk = ThunkAction<any, RootState, unknown , Action<string>>;
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./user"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import thunk from 'redux-thunk'

const reducers = combineReducers({
 //...
//  reducer: persistedReducer,
 user: userDataReducer
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
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
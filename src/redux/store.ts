import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./user"
import importIFReducer from "./importInterFood"
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import thunk from 'redux-thunk'


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
  middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
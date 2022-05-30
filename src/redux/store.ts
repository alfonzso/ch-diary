import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./user"
import importIFReducer from "./importInterFood"
import todayReducer from "./today"
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'


const reducers = combineReducers({
  user: userDataReducer,
  importIF: importIFReducer,
  today: todayReducer
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['importIF','today']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
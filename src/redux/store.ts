import { AnyAction, combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import userDataSlice, { UserActionTypes } from "./userSlice"
import importIFSlice from "./importInterFoodSlice"
import todaySlice from "./todaySlice"
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import loginSlice from "./loginSlice";

const AppReducers = combineReducers({
  user: userDataSlice,
  importIF: importIFSlice,
  today: todaySlice,
  login: loginSlice
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['importIF', 'today', 'login']
};

// export type AppReducerType = ReturnType<typeof AppReducers> | undefined;
export type AppReducerType = ReturnType<typeof AppReducers>

const rootReducer: Reducer<AppReducerType> = (state: AppReducerType | undefined, action: AnyAction) => {

  if (action.type === UserActionTypes.LOGOUT) { // check for action type
    state = {} as AppReducerType;
    storage.removeItem('persist:root')
  }
  // console.log("state, action", state, action)
  return AppReducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
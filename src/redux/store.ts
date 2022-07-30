import { AnyAction, combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import userDataReducer, { UserActionTypes } from "./userSlice"
import importIFReducer from "./importInterFoodSlice"
import todayReducer from "./todaySlice"
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

const AppReducers = combineReducers({
  user: userDataReducer,
  importIF: importIFReducer,
  today: todayReducer
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['importIF', 'today']
};

// export type AppReducerType = ReturnType<typeof AppReducers> | undefined;
export type AppReducerType = ReturnType<typeof AppReducers>

const rootReducer: Reducer<AppReducerType> = (state: AppReducerType | undefined, action: AnyAction) => {

  if (action.type === UserActionTypes.LOGOUT) { // check for action type
    state = {} as AppReducerType;
    storage.removeItem('persist:root')
  }
  console.log("state, action", state, action)

  return AppReducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
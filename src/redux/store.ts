import { AnyAction, CombinedState, combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import userDataReducer, { UserActionTypes, UserState } from "./user"
import importIFReducer from "./importInterFood"
import todayReducer, { TodayState } from "./today"
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { ImportState } from "./ImportState";


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

export type AppReducerType = ReturnType<typeof AppReducers> | undefined;

type kek = Reducer<CombinedState<{
  user: UserState;
  importIF: ImportState;
  today: TodayState;
}>, AnyAction>

// const rootReducer = (state: AppReducerType, action: AnyAction) => {
const rootReducer: kek = (state: AppReducerType, action: AnyAction) => {

  if (action.type === UserActionTypes.LOGOUT) { // check for action type
    // state = undefined;
    state = {} as AppReducerType;
    storage.removeItem('persist:root')

  }
  // let faf = combinedReducers(state, action)
  // combineReducers({...state,action})
  // // combineReducers({...state})
  // if (state){
  // }
  console.log("state, action", state, action)
  // let kek = combinedReducers(state, action);

  return AppReducers(state, action);
  // return state
  // return combineReducers(state, action);
  // return persistedReducer(state, action);
  // return persistReducer(persistConfig, combineReducers({ faf }));
  // return Reducer(state,action)
  // return state
};

const combinedReducersFAF = combineReducers(rootReducer)
// const combinedReducersFAF = combineReducers({
//   rootReducer, user: userDataReducer,
//   importIF: importIFReducer,
//   today: todayReducer
// })


// const fafa = persistReducer(persistConfig, rootReducer);

// const persistedReducer = persistReducer(persistConfig, combinedReducers);
// const persistedReducer = persistReducer(persistConfig, combinedReducersFAF);
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  // reducer: persistReducer(persistConfig, rootReducer),
  reducer: persistedReducer,
  // reducer: rootReducer,
  middleware: [thunk]
});



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
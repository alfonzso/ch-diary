import { createSlice } from "@reduxjs/toolkit";
import { getYYYYMMDD, removeOneDay, addOneDay } from "../utils";

export interface TodayState {
  everyHalfHour: number
  todayDateAsString: string
  todayDate: Date
}

const initialState: TodayState = {
  everyHalfHour: 24 * 2,
  todayDateAsString: "1970-01-01",
  todayDate: getYYYYMMDD()
}

export const todaySlice = createSlice({
  name: "today",
  initialState,
  reducers: {
    getTodayDateAsString: (state) => {
      state.todayDateAsString = state.todayDate.toLocaleDateString("en-ca")
    },
    previousDay: (state) => {
      state.todayDate = removeOneDay(state.todayDate)
      state.todayDateAsString = state.todayDate.toLocaleDateString("en-ca")
    },
    todayDay: (state) => {
      state.todayDate = getYYYYMMDD()
      state.todayDateAsString = state.todayDate.toLocaleDateString("en-ca")
    },
    nextDay: (state) => {
      state.todayDate = addOneDay(state.todayDate)
      state.todayDateAsString = state.todayDate.toLocaleDateString("en-ca")
    }
  }
});

export const { getTodayDateAsString, previousDay, todayDay, nextDay } = todaySlice.actions;
export default todaySlice.reducer
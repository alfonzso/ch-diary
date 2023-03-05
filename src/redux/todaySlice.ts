import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { foodInnerProps } from "../Components/Food";
import { DiaryGetEntryNickNameDateResponse } from "../types";
import { getYYYYMMDD, removeOneDay, addOneDay, ToastError } from "../utils";
import { newFetchWithAuth } from "../utils/fetchInstance";

const hourMinuteToDateTime = (date: Date) => {
  const hour = date.getHours() - 2
  const minute = date.getMinutes() <= 15 ? 0 : 0.5
  return `${hour + minute}`
}

interface ITodayFoods {
  resp: DiaryGetEntryNickNameDateResponse
  date: string
}

export interface TodayState {
  everyHalfHour: number
  todayAsYYYYMMDD: string
  todayAshhmmss: string
  todayDate: Date
  todayFood: foodInnerProps[];
}

const initialState: TodayState = {
  everyHalfHour: 24 * 2,
  todayAsYYYYMMDD: "1970-01-01",
  todayAshhmmss: "00:00:00.000Z",
  todayDate: getYYYYMMDD(),
  todayFood: []
}

export const getTodayFoods = createAsyncThunk<ITodayFoods, { date: string }>(
  'today/getFood',
  async ({ date }) => {
    return newFetchWithAuth<DiaryGetEntryNickNameDateResponse, ITodayFoods>({
      url: `/api/diary/getEntry/date/${date}`,
      newFetchResolve: (response) => {
        return { resp: response, date }
      },
      newFetchReject(error) {
        return Promise.reject(error)
      },
    })
  }
)

const fixedDate = (date: Date) => {
  const offset = date.getTimezoneOffset()
  date = new Date(date.getTime() - (offset * 60 * 1000))
  let [todayAsYYYYMMDD, todayAshhmmss] = date.toISOString().split('T')
  return { todayAsYYYYMMDD, todayAshhmmss }
}

export const todaySlice = createSlice({
  name: "today",
  initialState,
  extraReducers: (builder) => {

    builder.addCase(getTodayFoods.fulfilled, (state, { payload: { resp, date } }) => {
      if (!(resp && date)) return

      const convertedFoodData: foodInnerProps[] = resp.data.map(diaryFood => {
        return {
          id: diaryFood.id,
          name: diaryFood.Food.name,
          date: fixedDate(new Date(diaryFood.createdAt)).todayAsYYYYMMDD,
          dateTime: hourMinuteToDateTime(new Date(diaryFood.createdAt)),
          type: diaryFood.Food.Interfood.InterfoodType.name,
          portion: diaryFood.Food.portion,
          props: diaryFood.Food.FoodProperite
        }
      })

      // state.diaryFood = removeDuplicatedElementsById([...state.diaryFood, ...convertedFoodData])
      state.todayFood = convertedFoodData.filter(data => data.date === date)

    })

    builder.addCase(getTodayFoods.rejected, (state, { payload }) => {
      // console.log('getTodayFoods rejected: ', state, payload);
      ToastError("Can't get today's food ! ")
    })
  },
  reducers: {
    getTodayDateAsString: (state) => {
      let getTodayDate = getYYYYMMDD();
      state.todayDate = getTodayDate;
      state.todayAsYYYYMMDD = fixedDate(getTodayDate).todayAsYYYYMMDD
    },
    previousDay: (state) => {
      let previousDay = removeOneDay(state.todayDate);
      let fixedPreviousDay = fixedDate(previousDay)
      console.log("nextDay, fixedNextDay", previousDay, fixedPreviousDay);
      state.todayDate = previousDay;
      state.todayAsYYYYMMDD = fixedDate(previousDay).todayAsYYYYMMDD
      state.todayAshhmmss = fixedDate(previousDay).todayAshhmmss
    },
    todayDay: (state) => {
      let getTodayDate = getYYYYMMDD();
      state.todayDate = getTodayDate;
      state.todayAsYYYYMMDD = fixedDate(getTodayDate).todayAsYYYYMMDD
    },
    nextDay: (state) => {
      let nextDay = addOneDay(state.todayDate);
      let fixedNextDay = fixedDate(nextDay)
      console.log("nextDay, fixedNextDay", nextDay, fixedNextDay);
      state.todayDate = nextDay;
      state.todayAsYYYYMMDD = fixedNextDay.todayAsYYYYMMDD
      state.todayAshhmmss = fixedNextDay.todayAshhmmss
    }
  }
});

export const { getTodayDateAsString, previousDay, todayDay, nextDay } = todaySlice.actions;
export default todaySlice.reducer

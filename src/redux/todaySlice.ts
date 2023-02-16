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
  return date.toISOString().split('T')[0]
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
          date: fixedDate(new Date(diaryFood.createdAt)),
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
      state.todayAsYYYYMMDD = fixedDate(getTodayDate)
    },
    previousDay: (state) => {
      state.todayDate = removeOneDay(state.todayDate);
      [state.todayAsYYYYMMDD, state.todayAshhmmss] = state.todayDate.toISOString().split('T')
    },
    todayDay: (state) => {
      let getTodayDate = getYYYYMMDD();
      state.todayDate = getTodayDate;
      state.todayAsYYYYMMDD = fixedDate(getTodayDate)
    },
    nextDay: (state) => {
      state.todayDate = addOneDay(state.todayDate);
      [state.todayAsYYYYMMDD, state.todayAshhmmss] = state.todayDate.toISOString().split('T')
    }
  }
});

export const { getTodayDateAsString, previousDay, todayDay, nextDay } = todaySlice.actions;
export default todaySlice.reducer

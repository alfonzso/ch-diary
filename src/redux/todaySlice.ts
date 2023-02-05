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
  todayDateAsString: string
  todayDate: Date
  todayFood: foodInnerProps[];
}

const initialState: TodayState = {
  everyHalfHour: 24 * 2,
  todayDateAsString: "1970-01-01",
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
          date: new Date(diaryFood.createdAt).toLocaleDateString("en-ca"),
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

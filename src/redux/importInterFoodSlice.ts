import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { foodInnerProps } from '../Components/Table/Food'
import { DiaryGetEntryNickNameDateResponse, InterfoodImportResponse } from '../types'
import { newFetch, newFetchWithAuth, ResponseErrorHandler } from '../utils/fetchInstance'
import { removeDuplicatedElementsById, ToastError, ToastSucces } from '../utils/oneliners'

interface ITodayFoods {
  resp: DiaryGetEntryNickNameDateResponse
  date: string
}

const hourMinuteToDateTime = (date: Date) => {
  const hour = date.getHours() - 2
  const minute = date.getMinutes() <= 15 ? 0 : 0.5
  return `${hour + minute}`
}

interface ImportState {
  value: boolean;
  diaryFood: foodInnerProps[];
  todayFood: foodInnerProps[];
}

const initialState: ImportState = {
  value: false,
  diaryFood: [],
  todayFood: []
};

export const sendImportedData = createAsyncThunk<InterfoodImportResponse, string[]>(
  'import/InterFood',
  async (importData) => {

    return newFetchWithAuth<InterfoodImportResponse>({
      url: `/api/interfood/import`,
      newFetchResolve:
        (response) => {
          if (response.error) {
            throw new Error(response.error.message);
          }
          return response
        },
      config:
      {
        method: "POST",
        body: JSON.stringify({ data: importData }),
      }
    })

  }
)

export const getTodayFoods = createAsyncThunk<ITodayFoods, { user: string, date: string }>(
  'today/getFood',
  async ({ user, date }) => {
    return newFetch<DiaryGetEntryNickNameDateResponse, ITodayFoods>({
      url: `/api/diary/getEntry/nickname/${user}/date/${date}`,
      newFetchResolve: (response) => {
        return { resp: response, date }
      },
    })
  }
)

export const importIFSlice = createSlice({
  name: 'importIF',
  initialState,
  extraReducers: (builder) => {

    builder.addCase(sendImportedData.fulfilled, (state, { payload: { data } }) => {
      ToastSucces('Import Big Success!! ')
    })
    builder.addCase(sendImportedData.rejected, (state, { payload }) => {
      ToastError('Import Failed!! ')
    })

    builder.addCase(getTodayFoods.fulfilled, (state, { payload: { resp, date } }) => {

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

      state.diaryFood = removeDuplicatedElementsById([...state.diaryFood, ...convertedFoodData])
      state.todayFood = convertedFoodData.filter(data => data.date === date)

    })
    builder.addCase(getTodayFoods.rejected, (state, { payload }) => {
      console.log('getTodayFoods rejected: ', state, payload);
    })
  },
  reducers: {
    importToggle: (state) => {
      state.value = !state.value
    }
  },
})

// Action creators are generated for each case reducer function
export const { importToggle } = importIFSlice.actions

export default importIFSlice.reducer
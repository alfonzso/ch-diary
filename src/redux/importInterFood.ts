import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { foodInnerProps } from '../Components/Table/Food'
import { diaryGetEntryNickNameDateResponse, InterfoodImportResponse } from '../types'
import { newFetch, newFetchWithAuth } from '../utils/fetchInstance'
import { removeDuplicatedElementsById } from '../utils/util'
import { ImportState } from './ImportState'

export const sendImportedData = createAsyncThunk(
  'import/InterFood',
  async (importData: string[]) => {

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

export const getTodayFoods = createAsyncThunk(
  'today/getFood',
  async ({ user, date }: { user: string, date: string }) => {
    return newFetch<diaryGetEntryNickNameDateResponse>({
      url: `/api/diary/getEntry/nickname/${user}/date/${date}`,
      newFetchResolve: (response) => {
        return response
      },
    })
  }
)

const initialState: ImportState = {
  value: false,
  diaryFood: []
};

export const importIFSlice = createSlice({
  name: 'importIF',
  initialState,
  extraReducers: (builder) => {

    builder.addCase(sendImportedData.fulfilled, (state, { payload }) => {
      toast.success('Import Big Success!! ', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    builder.addCase(sendImportedData.rejected, (state, { payload }) => {
      toast.error('Import Failed!! ', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })

    builder.addCase(getTodayFoods.fulfilled, (state, { payload }: { payload: diaryGetEntryNickNameDateResponse }) => {

      console.log("getTodayFoods.fulfilled", payload)

      const hourMinuteToDateTime = (date: Date) => {
        const hour = date.getHours() - 2
        const minute = date.getMinutes() <= 15 ? 0 : 0.5
        return `${hour + minute}`
      }

      const { data } = payload
      const convertedFoodData: foodInnerProps[] = data.map(diaryFood => {
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
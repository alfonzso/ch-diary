import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { foodInnerProps } from '../Components/DiaryCommon/Food'
import { useFetch } from '../Hooks'
import { apiDiaryGetEntryNickname } from '../types'
import customFetcher from '../utils/fetchInstance'
import { removeDuplicatedElementsById } from '../utils/util'

export const sendImportedData = createAsyncThunk(
  'import/InterFood',
  async (importData: string[]) => {
    return customFetcher(
      `/api/interfood/import`,
      {
        method: "POST",
        body: JSON.stringify({ data: importData }),
        headers: {
          'Content-Type': 'application/json'
        },
      }
    ).then(
      (res) => res.fetchObject.response
    )
  }
)
export const getTodayFoods = createAsyncThunk(
  'today/getFood',
  async ({ user, date }: { user: string, date: string }) => {
    const chEntry = useFetch<apiDiaryGetEntryNickname>(`/api/diary/getEntry/nickname/alfonzso`);
    console.log("chEntry ", chEntry);
    const response = await customFetcher(
      `/api/diary/getEntry/nickname/${user}/date/${date}`
    )
    return response.fetchObject
  }
)

type diaryFood = {
  id: string;
  createdAt: Date;
  User: {
    email: string;
  };
  Food: {
    name: string;
    portion: number;
    FoodProperite: {
      gramm: number;
      kcal: number;
      portein: number;
      fat: number;
      ch: number;
    };
    Interfood: {
      InterfoodType: {
        name: string;
      };
    };
  }
}

const foodProps = {
  "gramm": 100,
  "kcal": 111,
  "portein": 222,
  "fat": 333,
  "ch": 444
}

export interface ImportState {
  value: boolean,
  diaryFood: foodInnerProps[]
}

const initialState: ImportState = {
  value: false,
  diaryFood: [
    // { id: "1", name: "Nagyon de nagyon finom kaja", portion: 450, type: "D123", props: foodProps, dateTime: "10" },
  ]
}

export const importIFSlice = createSlice({
  name: 'importIF',
  initialState,
  extraReducers: (builder) => {

    builder.addCase(sendImportedData.fulfilled, (state, { payload }) => {
      console.log('sendImportedData fulfilled: ', state, payload);
    })
    builder.addCase(sendImportedData.rejected, (state, { payload }) => {
      console.log('sendImportedData rejected: ', state, payload);
    })

    builder.addCase(getTodayFoods.fulfilled, (state, { payload }) => {

      const hourMinuteToDateTime = (date: Date) => {
        const hour = date.getHours() - 2
        const minute = date.getMinutes() <= 15 ? 0 : 0.5
        return `${hour + minute}`
      }

      const { data }: { data: diaryFood[] } = payload.body
      const convertedFoodData: foodInnerProps[] = data.map(diaryFood => {
        return {
          id: diaryFood.id,
          name: diaryFood.Food.name,
          // date: diaryFood.createdAt.toLocaleDateString("en-ca"),
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
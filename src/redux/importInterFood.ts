import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { foodInnerProps } from '../components/DiaryCommon/Food'
import customFetcher from '../utils/fetchInstance'
// import { AppThunk } from './store'


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// export const sendImportedData: AppThunk = createAsyncThunk(
export const sendImportedData = createAsyncThunk(
  'import/InterFood',
  // async (importData: string[] ) => {
  async (importData: string[]) => {
    // const { todos } = getState()
    // console.log({ todos })
    // you can dispatch any action from here!
    // dispatch(del(2))
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
      // (res) => res.fetchObject.response.json()
      (res) => res.fetchObject.response
    )
  }
)
export const getTodayFoods = createAsyncThunk(
  'today/getFood',
  // async (importData: string[] ) => {
  async ({ user, date }: { user: string, date: string }) => {
    // const { todos } = getState()
    // console.log({ todos })
    // you can dispatch any action from here!
    // dispatch(del(2))
    // return
    // const r = await fetch('/fakeApi/posts')
    // r.data
    const response = await customFetcher(
      `/api/diary/getEntry/nickname/${user}/date/${date}`
    )
    return response.fetchObject
    // .then(
    //   // (res) => res.fetchObject.response.json()
    //   (res) => res.fetchObject.response
    // )
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
  "kcal": 140.22,
  "portein": 10.07,
  "fat": 5.38,
  "ch": 15.69
}

export interface ImportState {
  value: boolean,
  diaryFood: foodInnerProps[]
}

const initialState: ImportState = {
  value: false,
  diaryFood: [
    { id: "1", name: "Nagyon de nagyon finom kaja", portion: 450, type: "D001", props: foodProps, dateTime: "10" },
  ]
}

export const importIFSlice = createSlice({
  name: 'importIF',
  initialState,
  extraReducers: (builder) => {

    builder.addCase(sendImportedData.fulfilled, (state, { payload }) => {
      // state.entities[payload.id] = payload
      console.log('sendImportedData fulfilled: ', state, payload);
    })
    builder.addCase(sendImportedData.rejected, (state, { payload }) => {
      // state.entities[payload.id] = payload
      console.log('sendImportedData rejected: ', state, payload);
    })

    builder.addCase(getTodayFoods.fulfilled, (state, { payload }) => {
      // state.entities[payload.id] = payload


      console.log('getTodayFoods fulfilled: ', state, payload.body);

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
          dateTime: hourMinuteToDateTime(new Date(diaryFood.createdAt)),
          type: diaryFood.Food.Interfood.InterfoodType.name,
          portion: diaryFood.Food.portion,
          // props: Object.entries(diaryFood.Food.FoodProperite).map(prop => prop.join(": ")).join(' | ')
          props: diaryFood.Food.FoodProperite
        }
      })

      console.log("convertedFoodData: ", convertedFoodData, state, state.diaryFood);
      // this.state.
      // state.diaryFood.push(convertedFoodData)
      state.diaryFood = convertedFoodData
      // state.diaryFood = [...state.diaryFood, ...convertedFoodData]


    })
    builder.addCase(getTodayFoods.rejected, (state, { payload }) => {
      // state.entities[payload.id] = payload
      console.log('getTodayFoods rejected: ', state, payload);
    })
  },
  reducers: {
    importToggle: (state) => {
      state.value = !state.value
    }
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { importToggle } = importIFSlice.actions

export default importIFSlice.reducer
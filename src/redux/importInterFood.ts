import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ImportState {
  value: boolean
}

const initialState: ImportState = {
  value: false,
}

export const importIFSlice = createSlice({
  name: 'importIF',
  initialState,
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
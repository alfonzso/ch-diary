import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const redirectSlice = createSlice({
  name: "redirect",
  initialState: {
    redirectNeeded: false
  },
  reducers: {
    setRedirectNeeded: (state, action: PayloadAction<boolean>) => {
      // state.todayDateAsString = state.todayDate.toLocaleDateString("en-ca")
      state.redirectNeeded = action.payload
    }

  }
});

export const { } = redirectSlice.actions;
export default redirectSlice.reducer


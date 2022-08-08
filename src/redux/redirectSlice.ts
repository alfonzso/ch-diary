import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const redirectSlice = createSlice({
  name: "redirect",
  initialState: {
    redirectNeeded: false
  },
  reducers: {
    setRedirectNeeded: (state, action: PayloadAction<boolean>) => {
      state.redirectNeeded = action.payload
      console.log('setRedirectNeeded', action.payload);
    }

  }
});

export const { setRedirectNeeded } = redirectSlice.actions;
export default redirectSlice.reducer


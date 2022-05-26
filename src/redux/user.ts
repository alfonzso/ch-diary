import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../types";
import { RootState } from "./store";

// Define a type for the slice state
interface UserState {
  data: UserData
}

// Define the initial state using that type
const initialState: UserState = {
  data: {
    id: "",
    nickname: "",
    email: ""
  }
}

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<UserData>) => {
      console.log(
        "add func", action, state.data
      )
      const user: UserData = action.payload
      state.data = {
        id: user.id,
        nickname: user.nickname,
        email: user.email
      }

      console.log(
        "add func", action, state.data
      )

    }
  }
});

export const { add } = userSlice.actions;
export const selectCount = (state: RootState) => state.user.data
export default userSlice.reducer
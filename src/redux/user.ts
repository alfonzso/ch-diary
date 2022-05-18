import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../types";
import { RootState } from "./store";


// Define a type for the slice state
interface UserState {
  userData: UserData
}

// Define the initial state using that type
const initialState: UserState = {
  userData: {
    id: "",
    nickname: "",
    email: ""
  }
}

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.count += 1;
    // },
    // decrement: (state) => {
    //   state.count -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.count += action.payload;
    // }
    add: (state, action: PayloadAction<UserData>) => {
      console.log(
        "add func", action, state.userData
      )
      const user: UserData = action.payload
      state.userData = {
        id: user.id,
        nickname: user.nickname,
        email: user.email
      }

      console.log(
        "add func", action, state.userData
      )

    }
  }
});

// Action creators are generated for each case reducer function
// export const { add } = userSlice.actions;

// export default userSlice.reducer;

export const { add } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.userData

export default userSlice.reducer
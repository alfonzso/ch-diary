import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData, userInfoFromToken } from "../types";
import jwt_decode, { JwtPayload } from "jwt-decode";

// Define a type for the slice state
interface UserState {
  data: UserData
}

// Define the initial state using that type
const initialState: UserState = {
  data: {
    id: "",
    nickname: "",
    email: "",
    accesToken: "",
    chInsulinRatio: 4
  }
}

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<string>) => {
      console.log(
        "add func", action, state.data
      )

      const user = jwt_decode<JwtPayload>(action.payload) as userInfoFromToken
      state.data.id = user.userId
      state.data.nickname = user.userNickName
      state.data.email = user.userEmail
      state.data.accesToken = action.payload
      // state.data = {
      //   id: user.userId,
      //   nickname: user.userNickName,
      //   email: user.userEmail,
      //   accesToken: action.payload
      // }

      console.log(
        "add func", action, state.data
      )

    },
    updateUserToken: (state, action: PayloadAction<string>) => {
      console.log("###################### Token stored in user");
      state.data.accesToken = action.payload
    }
  }
});

export const { addUser, updateUserToken } = userSlice.actions;
export default userSlice.reducer
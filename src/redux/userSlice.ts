import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData, userInfoFromToken } from "../types";
import jwt_decode, { JwtPayload } from "jwt-decode";

// Define a type for the slice state
export interface UserState {
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

export const UserActionTypes = {
  LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
  LOGOUT: 'USERS_LOGOUT',
};

export function logout() {
  return { type: UserActionTypes.LOGOUT }
}

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    updateUserInformations: (state, action: PayloadAction<string>) => {

      const user = jwt_decode<JwtPayload>(action.payload) as userInfoFromToken
      state.data.id = user.userId
      state.data.nickname = user.userNickName
      state.data.email = user.userEmail
      state.data.accesToken = action.payload

    },
    updateUserToken: (state, action: PayloadAction<string>) => {
      console.log("###################### Token stored in user");
      state.data.accesToken = action.payload
    }
  }
});

export const { updateUserInformations, updateUserToken } = userSlice.actions;
export default userSlice.reducer
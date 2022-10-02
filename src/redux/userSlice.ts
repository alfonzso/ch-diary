import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData, userInfoFromToken } from "../types";
import jwt_decode, { JwtPayload } from "jwt-decode";

export interface UserState {
  data: UserData
}

const initialState: UserState = {
  data: {
    id: "",
    nickname: "",
    email: "",
    accessToken: "",
    refreshToken: "",
    chInsulinRatio: 4,
    remaingLoginTime: 0,
    // isRefreshTokenExpired: false
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
      const { user } = jwt_decode<JwtPayload>(action.payload) as userInfoFromToken
      state.data.id = user.id
      state.data.nickname = user.nickname
      state.data.email = user.email
    },
    updateUserAccessToken: (state, action: PayloadAction<string>) => {
      state.data.accessToken = action.payload
    },
    updateUserRefreshToken: (state, action: PayloadAction<string>) => {
      state.data.refreshToken = action.payload
    },
    // getRefreshTokenStatus: (state) => {
    //   if (!state.data.refreshToken) return
    //   const getTokenExp = jwt_decode<JwtPayload>(state.data.refreshToken).exp!
    //   state.data.isRefreshTokenExpired = new Date(getTokenExp).getTime() - Math.floor(new Date().getTime() / 1000) < 0
    //   console.log(getTokenExp, new Date(getTokenExp).getTime() - Math.floor(new Date().getTime() / 1000));
    // },
    getLoginTime: (state) => {
      if (!state.data.refreshToken) return
      const getTokenExp = jwt_decode<JwtPayload>(state.data.refreshToken).exp
      if (!getTokenExp) return
      const timeDiff = new Date(getTokenExp).getTime() - Math.floor(new Date().getTime() / 1000)
      state.data.remaingLoginTime = new Date(timeDiff).getTime()
    },

  }
});

// export const { updateUserInformations, updateUserAccessToken, updateUserRefreshToken, getRefreshTokenStatus, getLoginTime } = userSlice.actions;
export const { updateUserInformations, updateUserAccessToken, updateUserRefreshToken, getLoginTime } = userSlice.actions;
export default userSlice.reducer
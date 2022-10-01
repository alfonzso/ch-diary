import { ResponseErrorHandler } from "../utils/fetchInstance"

type UserData = {
  id: string
  email: string
  nickname: string
  accessToken: string
  refreshToken: string
  chInsulinRatio: number
  // remaingLoginTime: Date | null
  remaingLoginTime: number
  // isRefreshTokenExpired: boolean
  // role: string
}

interface apiDiaryTestData {
  success: boolean,
  message: string,
  data: {
    userId: string,
    userEmail: string,
    userNickName: string,
    iat: number,
    exp: number
  }
}

type DiaryTestResponse = apiDiaryTestData & ResponseErrorHandler

export type {
  DiaryTestResponse,
  UserData
}
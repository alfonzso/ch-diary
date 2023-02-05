import { ResponseErrorHandler } from "../utils/fetchInstance"
import { UserPayload } from "./token"

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

interface TData extends UserPayload {
  iat: number
  exp: number
}

interface apiDiaryTestData {
  success: boolean,
  message: string,
  data: TData
}

type DiaryTestResponse = apiDiaryTestData & ResponseErrorHandler

export type {
  DiaryTestResponse,
  UserData
}
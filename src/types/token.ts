import { ResponseErrorHandler } from "../utils/fetchInstance"

interface userInfoFromToken {
  userId: string
  userNickName: string
  userEmail: string
  jti: string
}

interface TokenData {
  accessToken: string
  refreshToken: string
}

type TokenResponse = ResponseErrorHandler & TokenData
type LoginResponse = ResponseErrorHandler & TokenData

export type {
  userInfoFromToken,
  TokenResponse,
  LoginResponse
}
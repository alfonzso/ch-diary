import { ResponseErrorHandler } from "../utils/fetchInstance"

export type UserPayload = {
    id: string
    email: string
    nickname: string
};

// export interface jwtUserPayload{
//   user: UserPayload
// }

interface userInfoFromToken {
  user: UserPayload
  // userId: string
  // userNickName: string
  // userEmail: string
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
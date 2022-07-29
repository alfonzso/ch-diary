import { ResponseErrorHandler } from "../utils/fetchInstance"

// interface chInsulinRatio {
//   value: number
// }

type UserData = {
  id: string
  email: string
  nickname: string
  accesToken: string
  chInsulinRatio: number
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
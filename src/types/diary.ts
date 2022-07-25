import { ResponseErrorHandler } from "../utils/fetchInstance"
import { FoodProperite } from "./interfood"

interface apiDiaryGetEntryNickNameDateData {
  status: boolean
  data: diaryData[]
}

interface apiDiaryGetEntryNickNameData {
  status: boolean
  data: diaryData[]
}

type diaryGetEntryNickNameResponse = apiDiaryGetEntryNickNameData & ResponseErrorHandler
type diaryGetEntryNickNameDateResponse = apiDiaryGetEntryNickNameDateData & ResponseErrorHandler

type diaryData = {
  id: string;
  Food: {
    Interfood: {
      InterfoodType: {
        name: string;
      };
    };
    FoodProperite: FoodProperite,
    name: string;
    portion: number;
  };
  User: {
    nickname: string;
    email: string;
  };
  createdAt: Date;
}

type simpleDiaryData = {
  gramm: number;
  kcal: number;
  portein: number;
  fat: number;
  ch: number;
  id: string;
  date: Date;
  nickname: string;
  foodName: string;
  foodType: string;
  portion: number;
}

export type {
  diaryGetEntryNickNameDateResponse,
  diaryGetEntryNickNameResponse,
  apiDiaryGetEntryNickNameDateData as apiDiaryGetEntryNickNameDate,
  diaryData,
  simpleDiaryData
}
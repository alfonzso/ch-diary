import { ResponseErrorHandler } from "../utils/fetchInstance"
import { FoodProperty } from "./interfood"

interface apiDiaryGetEntry {
  status: boolean
  data: diaryData[]
}

type DiaryGetEntryNickNameResponse = apiDiaryGetEntry & ResponseErrorHandler
type DiaryGetEntryNickNameDateResponse = apiDiaryGetEntry & ResponseErrorHandler

type diaryData = {
  id: string;
  Food: {
    Interfood: {
      InterfoodType: {
        name: string;
      };
    };
    FoodProperty: FoodProperty,
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
  energy: number;
  protein: number;
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
  DiaryGetEntryNickNameDateResponse,
  DiaryGetEntryNickNameResponse,
  diaryData,
  simpleDiaryData
}
import { ResponseErrorHandler } from "../utils/fetchInstance";

export interface FoodProperite {
  gramm: number;
  kcal: number;
  portein: number;
  fat: number;
  ch: number;
}

export interface apiInterfoodImportData {
  userId?: string,
  foodName: string,
  foodPortion?: number,
  createdAt: Date,
  interFoodType: string,
  foodProp?: FoodProperite
}

export type InterfoodImportResponse = apiInterfoodImportData & ResponseErrorHandler
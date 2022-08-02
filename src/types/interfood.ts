import { ResponseErrorHandler } from "../utils/fetchInstance";

export interface FoodProperite {
  gramm: number;
  kcal: number;
  portein: number;
  fat: number;
  ch: number;
}

export interface apiInterfoodImportStructure {
  userId?: string,
  foodName: string,
  foodPortion?: number,
  createdAt: Date,
  interFoodType: string,
  foodProp?: FoodProperite
}

export interface apiInterfoodImportData {
  status: boolean
  data: apiInterfoodImportStructure[]
}

export type InterfoodImportResponse = apiInterfoodImportData & ResponseErrorHandler
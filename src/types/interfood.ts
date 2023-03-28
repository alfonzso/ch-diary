import { ResponseErrorHandler } from "../utils/fetchInstance";

export interface FoodProperty {
  gramm: number;
  energy: number;
  protein: number;
  fat: number;
  ch: number;
}

export interface apiInterfoodImportStructure {
  userId?: string,
  foodName: string,
  foodPortion?: number,
  createdAt: Date,
  interFoodType: string,
  foodProp?: FoodProperty
}

export interface apiInterfoodImportData {
  status: boolean
  data: apiInterfoodImportStructure[]
}

export type InterfoodImportResponse = apiInterfoodImportData & ResponseErrorHandler
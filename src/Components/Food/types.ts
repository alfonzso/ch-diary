type FoodProperty = {
  gramm: number;
  energy: number;
  protein: number;
  fat: number;
  ch: number;
}

interface foodInnerProps {
  id: string
  type: string
  portion: number
  props: FoodProperty
  name: string
  dateTime: string
  date: string
}

interface FoodProps {
  food?: foodInnerProps,
  setInitFollowers: any
}

interface foodPropertyComponentProps {
  foodProps: FoodProperty
  portion: number
}

export type {
  FoodProperty,
  foodInnerProps,
  FoodProps,
  foodPropertyComponentProps,
}
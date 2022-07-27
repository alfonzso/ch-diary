type FoodProperite = {
  gramm: number;
  kcal: number;
  portein: number;
  fat: number;
  ch: number;
}

interface foodInnerProps {
  id: string
  type: string
  portion: number
  props: FoodProperite
  name: string
  dateTime: string
  date: string
}

interface foodProps {
  food?: foodInnerProps
}

interface foodProperiteComponentProps {
  foodProps: FoodProperite
  portion: number
}

export type {
  FoodProperite,
  foodInnerProps,
  foodProps,
  foodProperiteComponentProps,
}
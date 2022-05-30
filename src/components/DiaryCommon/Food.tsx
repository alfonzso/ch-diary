import { drag } from "../../utils/dragAndDrop"
import './Food.css'

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
  food: foodInnerProps
}

const Food = ({ food }: foodProps) => {

  const calcFullProp = (props: FoodProperite, portion: number) => {
    const num: number = portion / props.gramm
    const res = Object.entries(props).map(([key, val]: [key: string, val: number]) => {
      return [key, Number((val * num).toFixed(2))].join(": ")
    }).join(' | ')
    console.log(res)
    return res
  }

  return (
    <div id={"food_" + food.id} data-id={food.id} className="food" draggable="true" onDragStart={drag} >
      <p> </p>
      < div className="follower" >
        <p>  {food.type} | {food.portion} | {food.name}  </p>
        <p>  {Object.entries(food.props).map(prop => prop.join(": ")).join(' | ')} </p>
        <p>  {calcFullProp(food.props, food.portion)} </p>
      </div >
    </div >
  )
}

export {
  Food
}
export type { foodProps, foodInnerProps }

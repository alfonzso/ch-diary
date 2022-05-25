import { drag } from "../../utils/dragAndDrop"


interface foodInnerProps {
  id: string
  type: string
  props: string
  name: string
  dateTime: string
}

interface foodProps {
  food: foodInnerProps
}

const Food = ({ food }: foodProps) => {

  return (
    <div id={"food_" + food.id} data-id={food.id} className="food" draggable="true" onDragStart={drag} >
      FOOD
      < div className="follower" >
        <p>  {food.type} </p>
        <p>  {food.name} </p>
        <p>  {food.props} </p>
      </div >
    </div >
  )
}

export {
  Food
}
export type { foodProps, foodInnerProps }

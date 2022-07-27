import { useState } from "react";
import { drag } from "../../../utils/dragAndDrop";
import { foodInnerProps, foodProperiteComponentProps, foodProps } from "./types";
import './index.scss'


const FoodProperiteComponent = (
  { foodProps, portion }: foodProperiteComponentProps
) => {
  const num: number = portion / foodProps.gramm

  const render = () => {
    return Object.entries(foodProps).map(([key, val]: [key: string, val: number]) => {
      return (
        <div className="foodPropRow" key={key}>
          <div> {key} </div> <div>{Number(val * num).toFixed(2)}</div>
        </div>
      )
    })
  }

  return (
    <div className="foodPropsContainer">
      {render()}
    </div>
  )
}

const Food = ({ food }: foodProps) => {

  const [hide, setHide] = useState(true)

  return (<>
    {food &&
      <div id={"food_" + food.id} data-id={food.id} className="food" draggable="true" onDragStart={drag} >
        <p className="foodInfoText" > {food.portion} g {food.name} {food.type} </p>
        < div className="follower" >
          <div className="followerMenuBar">
            <p className="followerFoodText" > {food.name} </p>
            <div className="toggleVisibility" onClick={() => { setHide(!hide) }}> P </div>
          </div>
          {!hide && <p> {Object.entries(food.props).map(prop => prop.join(": ")).join(' | ')} </p>}
          <FoodProperiteComponent foodProps={food.props} portion={food.portion} />
        </div >
      </div >}
  </>
  )
}

export {
  Food
}
export type { foodProps, foodInnerProps }

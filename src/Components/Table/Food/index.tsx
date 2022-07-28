import { useEffect, useState } from "react";
import { drag } from "../../../utils/dragAndDrop";
import { foodInnerProps, foodProperiteComponentProps, foodProps } from "./types";
import './index.scss'
import { useAppSelector } from "../../../redux/hooks";


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

const Food = ({ food, setInitFollowers }: foodProps) => {

  const [hide, setHide] = useState(true)
  const [calculatedCh, setCalculatedCh] = useState(0.0)
  const [insulinNeeded, setInsulinNeeded] = useState([] as {
    insulin: number;
    insulinRatio: number;
  }[])
  const userData = useAppSelector(state => state.user.data)

  useEffect(() => {
    if (food) {
      setCalculatedCh(
        (food.portion / food.props.gramm) * food.props.ch
      )
    }
  }, [food]);

  useEffect(() => {
    if (userData) {
      const calcInsList = [...Array(3).keys()].map((v, idx) => {
        return {
          insulin: calculatedCh / (userData.chInsulinRatio + v),
          insulinRatio: userData.chInsulinRatio + v
        }
      })
      setInsulinNeeded(
        calcInsList
      )
    }
  }, [userData, calculatedCh]);

  useEffect(() => {
    if (insulinNeeded.length > 0) setInitFollowers(true)
  }, [insulinNeeded]);

  return (<>
    {
      food &&
      <div id={"food_" + food.id} data-id={food.id} className="food" draggable="true" onDragStart={drag} >
        <p className="foodInfoText" > {food.portion} g {food.name} {food.type} </p>
        < div id="foodProp" className="follower" >
          <div className="followerMenuBar">
            <p className="followerFoodText" > {food.name} </p>
            <div className="toggleVisibility" onClick={() => { setHide(!hide) }}> P </div>
          </div>
          {!hide && <p> {Object.entries(food.props).map(prop => prop.join(": ")).join(' | ')} </p>}
          <FoodProperiteComponent foodProps={food.props} portion={food.portion} />
        </div >
        < div id="diabInfo" className="follower" >
          <p> CH: {calculatedCh.toFixed(2)} </p>
          <p> Insulin ratio: {userData.chInsulinRatio} </p>
          <>
            <div className="insulin-ratio-and-need">
              <p className="p-left"> Ratio </p> <p className="p-right"> Insulin needed </p>
            </div>
            {insulinNeeded.map((v, idx) => {
              return (
                <div key={idx} className="insulin-ratio-and-need">
                  <p className="p-left">  {v.insulinRatio} </p> <p className="p-right"> {v.insulin.toFixed(2)}</p>
                </div>
              )

            })}
          </>

        </div >
      </div >
    }
  </>
  )
}

export {
  Food
}
export type { foodProps, foodInnerProps }

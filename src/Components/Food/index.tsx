import { useEffect, useState } from "react";
import { drag } from "../../utils/dragAndDrop";
import { foodInnerProps, FoodProps } from "./types";
import { useAppSelector } from "../../redux/hooks";
import PopupInfo from "../PopupInfo";
import FoodProperiteComponent from "../FoodProperiteComponent";
import './index.scss'

const Food = ({ food, setInitFollowers }: FoodProps) => {
  const [FoodInfoWidth, _] = useState(150);
  const [hundredGrammToggle, setHundredGrammToggle] = useState(false)
  const [calculatedCh, setCalculatedCh] = useState(0.0)
  const [hundredGrammValues, setHundredGrammValues] = useState("")
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
      setHundredGrammValues(
        Object.entries(food.props).map(prop => prop.join(": ")).join(' | ')
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
  }, [insulinNeeded, setInitFollowers]);

  return food ? (
    <div id={"food_" + food.id} data-id={food.id} className="food" draggable="true" onDragStart={drag} >
      <p className="food-info-text" > {food.portion} g {food.name} {food.type} </p>

      <PopupInfo options={{ clsName: "food-info", backgroundColor: "grey", fontSize: "75%", width: `${FoodInfoWidth}px` }}>
        <>
          <div className="fi-menu-bar">
            <p className="fi-food-name" > {food.name} </p>
            <div className="fi-toggle-visibility" onClick={() => { setHundredGrammToggle(!hundredGrammToggle) }}> P </div>
          </div>
          {hundredGrammToggle && <p> {hundredGrammValues} </p>}
          <FoodProperiteComponent foodProps={food.props} portion={food.portion} />
        </>
      </PopupInfo>

      <PopupInfo options={{ clsName: "diab-info", left: `${FoodInfoWidth + 50}px`, backgroundColor: "#228ba5", fontSize: "75%", width: "150px" }}>
        <>
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
            })
            }
          </>
        </>
      </PopupInfo>

    </div >
  ) : null
}

export {
  Food
}

export type { FoodProps, foodInnerProps }

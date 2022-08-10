import { useEffect, useRef, useState } from "react";
import { drag } from "../../../utils/dragAndDrop";
import { foodInnerProps, foodProperiteComponentProps, FoodProps } from "./types";
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

const Food = ({ food, setInitFollowers }: FoodProps) => {
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

      <PopupInfo clsName="food-info" backgroundColor="grey" fontSize="75%" width="150px">
        <>
          <div className="fi-menu-bar">
            <p className="fi-food-name" > {food.name} </p>
            <div className="fi-toggle-visibility" onClick={() => { setHundredGrammToggle(!hundredGrammToggle) }}> P </div>
          </div>
          {hundredGrammToggle && <p> {hundredGrammValues} </p>}
          <FoodProperiteComponent foodProps={food.props} portion={food.portion} />
        </>
      </PopupInfo>

      <PopupInfo clsName="diab-info" left="400px" backgroundColor="#228ba5" fontSize="75%" width="150px">
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


type PopupInfoProps = {
  children: JSX.Element
  clsName?: string
  left?: string
  backgroundColor?: string
  fontSize?: string
  width?: string
  padding?: string
}

function PopupInfo({ children, clsName, left, backgroundColor, fontSize, width, padding }: PopupInfoProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={clsName ? clsName + " popup" : "popup"}
      ref={popupRef}
      style={
        {
          top: popupRef.current?.offsetHeight ? (popupRef.current?.offsetHeight! + 5) * -1 : "unset",
          left: left ? left : 10,
          "--popup-color": backgroundColor ? backgroundColor : "black",
          fontSize: fontSize ? fontSize : "100%",
          width: width ? width : "100%",
          padding: padding ? padding : "10px 0 10px 0"
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

export default PopupInfo;

export {
  Food
}

export type { FoodProps, foodInnerProps }

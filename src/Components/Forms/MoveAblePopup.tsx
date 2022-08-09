import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { useRef, useState, useEffect, Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { importToggle } from "../../redux/importInterFoodSlice";
import { RootState } from "../../redux/store";
import "./index.scss"

type MoveAblePopupProps = {
  coords: {
    x: number;
    y: number;
  },
  children: JSX.Element,
  // popupToggleFromParent: boolean
  // closeState: (boolean | Dispatch<SetStateAction<boolean>>)[];
  closePopupState: [boolean, Dispatch<SetStateAction<boolean>>];
  // }
  // setPopupToggleFromParent?: React.Dispatch<React.SetStateAction<boolean>>
  // send: (e: any) => void
  // setCoords: React.Dispatch<React.SetStateAction<{
  //   x: number;
  //   y: number;
  // }>>
}


export const MoveAblePopup = ({ coords, children, closePopupState }: MoveAblePopupProps) => {

  const moveAblePopupRef = useRef<HTMLDivElement>(null);
  const [divPoint, setDivPoint] = useState({ x: 0, y: 0 });
  const [LeftA, setLeftA] = useState<number | undefined>()
  const [RightA, setRightA] = useState<number | undefined>()
  const [isMDown, setIsMDown] = useState(false);
  const [PopupToggle, setPopupToggle] = closePopupState


  useEffect(() => {
    if (isMDown) {
      setLeftA(coords.x - divPoint.x);
      setRightA(coords.y - divPoint.y);
    }
  }, [coords, isMDown, divPoint]);

  const handleMouseDown = (e: React.MouseEvent) => {
    moveAblePopupRef.current!.style.userSelect = "none"
    setIsMDown(e.target === e.currentTarget)
    setDivPoint({
      x: coords.x - moveAblePopupRef.current?.offsetLeft!,
      y: coords.y - moveAblePopupRef.current?.offsetTop!
    });
  }

  const handleMouseUp = () => {
    moveAblePopupRef.current!.style.userSelect = "unset"

    setIsMDown(false)
  }

  return PopupToggle ? (

    <div className="moveable-popup" ref={moveAblePopupRef}
      style={{
        top: RightA,
        left: LeftA,
        right: 0
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <button className="the-x" onClick={() => setPopupToggle(cls => !cls)}  > X </button>
      {children}
    </div>

  ) : null;
}

export default MoveAblePopup;
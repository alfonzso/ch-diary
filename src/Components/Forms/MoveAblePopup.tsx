import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import "./index.scss";

export type MouseCoords = {
  left: number;
  top: number;
}

type MoveAblePopupProps = {
  coords: MouseCoords,
  children: JSX.Element,
  closePopupState: [boolean, Dispatch<SetStateAction<boolean>>];
}

export const MoveAblePopup = ({ coords, children, closePopupState }: MoveAblePopupProps) => {
  const moveAblePopupRef = useRef<HTMLDivElement>(null);
  const [divPoint, setDivPoint] = useState({ left: 0, top: 0 });
  const [StyleLeft, setStyleLeft] = useState<number | undefined>()
  const [StyleTop, setStyleTop] = useState<number | undefined>()
  const [isMDown, setIsMDown] = useState(false);
  const [PopupToggle, setPopupToggle] = closePopupState

  useEffect(() => {
    if (isMDown) {
      setStyleLeft(coords.left - divPoint.left);
      setStyleTop(coords.top - divPoint.top);
    }
  }, [coords, isMDown, divPoint]);

  const handleMouseDown = (e: React.MouseEvent) => {
    moveAblePopupRef.current!.style.userSelect = "none"
    setIsMDown(e.target === e.currentTarget)
    setDivPoint({
      left: coords.left - moveAblePopupRef.current?.offsetLeft!,
      top: coords.top - moveAblePopupRef.current?.offsetTop!
    });
  }

  const handleMouseUp = () => {
    moveAblePopupRef.current!.style.userSelect = "unset"
    setIsMDown(false)
  }

  return PopupToggle ? (

    <div className="moveable-popup" ref={moveAblePopupRef}
      style={{
        top: StyleTop,
        left: StyleLeft,
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
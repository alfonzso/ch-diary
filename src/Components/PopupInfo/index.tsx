import { useRef } from "react"

type PopupInfoProps = {
  children: JSX.Element
  popupRef?: React.RefObject<HTMLDivElement>
  options: {
    clsName?: string
    left?: string
    backgroundColor?: string
    fontSize?: string
    width?: string
    padding?: string
  }
}

const PopupInfoRepresentation = ({ children, popupRef, options: { clsName, left, backgroundColor, fontSize, width, padding } }: PopupInfoProps) => {

  return popupRef ? (
    <div
      className={clsName ? clsName + " popup" : "popup"
      }
      ref={popupRef}
      style={
        {
          top: popupRef.current?.offsetHeight ? (popupRef.current.offsetHeight! + 5) * -1 : "unset",
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
  ) : null
}

const PopupInfoUncontrolled = ({ children, options }: PopupInfoProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  return (
    <PopupInfoRepresentation children={children} popupRef={popupRef} options={options} />
  );
}

const PopupInfo = ({ children, popupRef, options }: PopupInfoProps) => {
  return popupRef ? (
    <PopupInfoRepresentation children={children} popupRef={popupRef} options={options} />
  ) : (
    <PopupInfoUncontrolled children={children} options={options} />
  )
}


export default PopupInfo;

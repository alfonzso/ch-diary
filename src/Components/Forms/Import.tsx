import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { importToggle, sendImportedData } from "../../redux/importInterFoodSlice";
import './Import.css'
import MoveAblePopup from "./MoveAblePopup";

type MoveAblePopupProps = {
  coords: {
    x: number;
    y: number;
  },
  // children: JSX.Element
  // send: (e: any) => void
  // setCoords: React.Dispatch<React.SetStateAction<{
  //   x: number;
  //   y: number;
  // }>>
}

const ImportForm = ({ coords }: MoveAblePopupProps) => {

  // const [isDown, setIsDown] = useState(false)
  // const [offset, setOffset] = useState([] as number[])
  const [importData, setImportData] = useState('')
  // const [mousePosition, setMousePosition] = useState({} as { x: number, y: number })
  const [CloseImport, setCloseImport] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();

  const sendImportInterFood = (ev: MouseEvent<HTMLButtonElement>) => {
    let trimmedImpData = importData.replace('\r\n', '\n').trim().split('\n').map(row => { return row.trim() })
    console.log("textarea VAL: ", trimmedImpData);
    dispatch(sendImportedData(trimmedImpData))
  }

  useEffect(() => {
    console.log(CloseImport, "CloseImport")
  }, [CloseImport]);

  // width: 100%;
  // height: 100%;
  // box-sizing: border-box;

  return (
    <div className="importInterFoodContainer">
      <button className="importInterFood" onClick={() => setCloseImport(pop => !pop)} > Import </button>
      <MoveAblePopup coords={coords} closePopupState={[CloseImport, setCloseImport]} >
        <div className="popup-children">
          {/* <div className="import-wrapper"> */}
            <textarea name="importFoodTextArea" id="importFoodTextArea"
              value={importData} onChange={(e) => {
                setImportData(e.target.value)
              }}
            />
            <button className="sendImportInterFood" onClick={sendImportInterFood} > SEND</button>
          {/* </div> */}
        </div>
      </MoveAblePopup>
    </div>
  )
}

export {
  ImportForm
};

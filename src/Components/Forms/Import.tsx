import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { importToggle, sendImportedData } from "../../redux/importInterFoodSlice";
import './Import.css'
import MoveAblePopup, { MouseCoords } from "./MoveAblePopup";

type MoveAblePopupProps = {
  coords: MouseCoords,
}

const ImportForm = ({ coords }: MoveAblePopupProps) => {

  const [importData, setImportData] = useState('')
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

  return (
    <div className="importInterFoodContainer">
      <button className="importInterFood" onClick={() => setCloseImport(pop => !pop)} > Import </button>
      <MoveAblePopup coords={coords} closePopupState={[CloseImport, setCloseImport]} >
        <div className="popup-children">
          <textarea name="importFoodTextArea" id="importFoodTextArea"
            value={importData} onChange={(e) => {
              setImportData(e.target.value)
            }}
          />
          <button className="sendImportInterFood" onClick={sendImportInterFood} > SEND</button>
        </div>
      </MoveAblePopup>
    </div>
  )
}

export {
  ImportForm
};

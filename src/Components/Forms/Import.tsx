import { AnyAction } from "@reduxjs/toolkit";
import { MouseEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { sendImportedData } from "../../redux/importInterFoodSlice";
import { RootState } from "../../redux/store";
import './Import.css';
import { useAppSelector } from "../../redux/hooks";
import MoveAblePopup, { MouseCoords } from "./MoveAblePopup";


type MoveAblePopupProps = {
  coords: MouseCoords,
}

const ImportForm = ({ coords }: MoveAblePopupProps) => {

  const importSendEvent = useAppSelector(state => state.importIF.event)
  const [importData, setImportData] = useState('')
  const [importPopupToggle, setImportPopupToggle] = useState(false);
  const [importSendButtonEnabled, setImportSendButtonEnabled] = useState(true);
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();

  const sendImportInterFood = (ev: MouseEvent<HTMLButtonElement>) => {
    let trimmedImpData = importData.replace('\r\n', '\n').trim().split('\n').map(row => { return row.trim() })
    console.log("textarea VAL: ", trimmedImpData);
    dispatch(sendImportedData(trimmedImpData))
    setTimeout(() => setImportPopupToggle(false), 5000);
  }

  useEffect(() => {
    if (!importSendButtonEnabled){
      setImportSendButtonEnabled(true)
    }
  }, [importSendEvent]);

  return (
    <div className="importInterFoodContainer">
      <button className="importInterFood" onClick={() => setImportPopupToggle(pop => !pop)} > Import </button>
      <MoveAblePopup coords={coords} closePopupState={[importPopupToggle, setImportPopupToggle]} >
        <div className="popup-children">
          <textarea name="importFoodTextArea" id="importFoodTextArea"
            value={importData} onChange={(e) => {
              setImportData(e.target.value)
            }}
          />
          <button className="sendImportInterFood" onClick={(e) => {
            setImportSendButtonEnabled(false)
            sendImportInterFood(e)
          }} disabled={!importSendButtonEnabled} > SEND</button>
        </div>
      </MoveAblePopup>
    </div>
  )
}

export {
  ImportForm
};

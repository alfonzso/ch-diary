import { AnyAction } from "@reduxjs/toolkit";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { MouseEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { useAppSelector } from "../../redux/hooks";
import { sendImportedData } from "../../redux/importInterFoodSlice";
import { logMeOut } from "../../redux/logoutSlice";
import { setRedirectNeeded } from "../../redux/redirectSlice";
import { RootState } from "../../redux/store";
import './Import.css';
import MoveAblePopup, { MouseCoords } from "./MoveAblePopup";


type MoveAblePopupProps = {
  coords: MouseCoords,
}

const ImportForm = ({ coords }: MoveAblePopupProps) => {

  const [importData, setImportData] = useState('')
  const [importToggle, setImportToggle] = useState(false);
  const userData = useAppSelector(state => state.user.data)
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();

  const sendImportInterFood = (ev: MouseEvent<HTMLButtonElement>) => {
    let trimmedImpData = importData.replace('\r\n', '\n').trim().split('\n').map(row => { return row.trim() })
    console.log("textarea VAL: ", trimmedImpData);
    dispatch(sendImportedData(trimmedImpData))
  }

  const getTokenExp = () => {
    return jwt_decode<JwtPayload>(userData.accesToken).exp!
  }

  const isTokenExpired = () => {
    return new Date(getTokenExp()).getTime() - Math.floor(new Date().getTime() / 1000) < 0
  }

  useEffect(() => {
    if (importToggle) {
      if (isTokenExpired()) {
        dispatch(setRedirectNeeded(true))
        dispatch(logMeOut())
      }
    }
  }, [importToggle, userData]);

  return (
    <div className="importInterFoodContainer">
      <button className="importInterFood" onClick={() => setImportToggle(pop => !pop)} > Import </button>
      <MoveAblePopup coords={coords} closePopupState={[importToggle, setImportToggle]} >
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

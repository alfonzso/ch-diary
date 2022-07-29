import { AnyAction } from "@reduxjs/toolkit";
import { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { importToggle, sendImportedData } from "../../redux/importInterFood";
import { RootState } from "../../redux/store";
import './Import.css'

const ImportForm = () => {

  const [isDown, setIsDown] = useState(false)
  const [offset, setOffset] = useState([] as number[])
  const [importData, setImportData] = useState('')
  const [mousePosition, setMousePosition] = useState({} as { x: number, y: number })

  const toggle = useSelector((state: RootState) => state.importIF.value)

  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();

  const onMouseDown = (ev: MouseEvent<HTMLDivElement>) => {
    if (ev.target !== ev.currentTarget) return;

    const x = ev.currentTarget.offsetLeft - ev.clientX - 50
    const y = ev.currentTarget.offsetTop - ev.clientY - 50
    setIsDown(true)
    setOffset(oldArray => [...oldArray, x, y]);
  }

  const onMouseUp = (ev: MouseEvent<HTMLDivElement>) => {
    setIsDown(false)
  }

  const onMouseLeave = (ev: MouseEvent<HTMLDivElement>) => {
    setIsDown(false)
  }

  const onMouseMove = (ev: MouseEvent<HTMLDivElement>) => {
    ev.preventDefault();
    if (isDown) {
      setMousePosition({
        x: ev.clientX,
        y: ev.clientY
      })
      ev.currentTarget.style.left = (mousePosition.x + offset[0]) + 5 + 'px';
      ev.currentTarget.style.top = (mousePosition.y + offset[1]) + 5 + 'px';
    }
  }

  const sendImportInterFood = (ev: MouseEvent<HTMLButtonElement>) => {
    let trimmedImpData = importData.replace('\r\n', '\n').trim().split('\n').map(row => { return row.trim() })
    console.log("textarea VAL: ", trimmedImpData);
    dispatch(sendImportedData(trimmedImpData))
  }

  return (
    <>
      {toggle &&
        <div id="importForm" className="importForm"
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          <button className="closeImportInterFood" onClick={() => { dispatch(importToggle()) }} >X</button>
          <textarea name="importFoodTextArea" id="importFoodTextArea"
            cols={80} rows={8}
            value={importData} onChange={(e) => {
              setImportData(e.target.value)
            }}
          />

          <button className="sendImportInterFood" onClick={sendImportInterFood} > SEND</button>
        </div>
      }
    </>
  )
}

export {
  ImportForm
};


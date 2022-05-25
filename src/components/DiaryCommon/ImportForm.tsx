import { AppDispatch, RootState } from "../../redux/store"
// import { useSelector, useDispatch } from 'react-redux';
import { importToggle, sendImportedData } from "../../redux/importInterFood";
import { MouseEventHandler, MouseEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/hooks";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";


// const mouseMove = (ev: MouseEvent<HTMLDivElement>) => {
//   console.log('kliiiik', ev.currentTarget);
//   console.log("mouse location:", ev.clientX, ev.clientY)

//   ev.currentTarget.style.left = ev.clientX + 'px';
//   ev.currentTarget.style.top = ev.clientY + 'px';
// }



const ImportForm = () => {


  // const [val, setVal] = useState("");
  const [isDown, setIsDown] = useState(false)
  const [offset, setOffset] = useState([] as number[])
  const [importData, setImportData] = useState([] as string[])
  const [mousePosition, setMousePosition] = useState({} as { x: number, y: number })

  const toggle = useSelector((state: RootState) => state.importIF.value)


  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
  // const dispatch: ThunkDispatch  = useAppDispatch()

  // useEffect(() => {
  //   val.trim().split('\n').map(row => {
  //     setImportData(oldRow => [...oldRow, row.trim()]);
  //   })
  // }, [val]);

  const onMouseDown = (ev: MouseEvent<HTMLDivElement>) => {
    if (ev.target !== ev.currentTarget) return;
    // console.log(ev.target,  ev.currentTarget);

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
    console.log("textarea VAL: ", importData);
    // setOffset(oldArray => [...oldArray,
    // ]);
    // val.split('\n').map(row => {
    //   // console.log(row.trim());
    //   setImportData(oldRow => [...oldRow, row.trim()]);
    // })
    dispatch(sendImportedData(importData))

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
            cols={60} rows={20}
            value={importData} onChange={(e) => {
              e.target.value.trim().split('\n').map(row => {
                setImportData(oldRow => [...oldRow, row.trim()]);
              })
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
}

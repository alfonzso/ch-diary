import { RootState } from "../../redux/store"
import { useSelector, useDispatch } from 'react-redux';
import { importToggle } from "../../redux/importInterFood";
import { MouseEventHandler, MouseEvent, useState } from "react";


// const mouseMove = (ev: MouseEvent<HTMLDivElement>) => {
//   console.log('kliiiik', ev.currentTarget);
//   console.log("mouse location:", ev.clientX, ev.clientY)

//   ev.currentTarget.style.left = ev.clientX + 'px';
//   ev.currentTarget.style.top = ev.clientY + 'px';
// }



const ImportForm = () => {

  const [isDown, setIsDown] = useState(false)
  const [offset, setOffset] = useState([] as number[])
  const [mousePosition, setMousePosition] = useState({} as { x: number, y: number })

  const onMouseDown = (ev: MouseEvent<HTMLDivElement>) => {
    const x = ev.currentTarget.offsetLeft - ev.clientX
    const y = ev.currentTarget.offsetTop - ev.clientY
    setIsDown(true)
    setOffset(oldArray => [...oldArray, x, y]);
  }

  const onMouseUp = (ev: MouseEvent<HTMLDivElement>) => {
    setIsDown(false)
  }

  const onMouseMove = (ev: MouseEvent<HTMLDivElement>) => {
    ev.preventDefault();
    if (isDown) {
      setMousePosition({
        x: ev.clientX,
        y: ev.clientY
      })
      ev.currentTarget.style.left = (mousePosition.x + offset[0]) + 'px';
      ev.currentTarget.style.top = (mousePosition.y + offset[1]) + 'px';
    }
  }

  const toggle = useSelector((state: RootState) => state.importIF.value)
  const dispatch = useDispatch()

  return (
    <>
      {toggle &&
        <div id="importForm" className="importForm" onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove}>
          <button className="closeImportInterFood" onClick={() => { dispatch(importToggle()) }} >X</button>
          <textarea name="importFoodTextArea" id="importFoodTextArea" cols={30} rows={10} ></textarea>
        </div>
      }
    </>
  )
}

export {
  ImportForm
}

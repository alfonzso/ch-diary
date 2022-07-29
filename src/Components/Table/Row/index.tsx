import { ReactElement } from 'react';
import { drop, allowDrop } from '../../../utils/dragAndDrop';
import { generateTimeHHMMSS } from '../../../utils/util';
import "./index.scss"

interface RowProps {
  idx: number
  hidden: boolean
  date: number
  food: ReactElement
}

export const EmptyRow = () => {
  return (
    <p className='emptyRowFiller'> </p>
  )
}

const Row = (props: RowProps) => {

  return (<>{
    !props.hidden &&
    <div className='chDiaryTableRow' >
      <div className='columnLeft'>
        <div className='dateColumn' data-time={(props.idx * 1 / 2).toString()}>
          {
            generateTimeHHMMSS(props.idx * 30, props.date).toLocaleTimeString()
          }
        </div>
      </div>
      <div className='columnRight foodColumn' onDrop={drop} onDragOver={allowDrop}>
        {
          <>
            {props.food && props.food}
            <EmptyRow />
          </>
        }
      </div>
    </div >
  }</>
  );
}

export {
  Row
};
export type { RowProps };
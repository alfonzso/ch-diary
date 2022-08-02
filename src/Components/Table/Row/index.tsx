import { ReactElement } from 'react';
import { generateTimeHHMMSS } from '../../../utils';
import { drop, allowDrop } from '../../../utils/dragAndDrop';
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
            generateTimeHHMMSS(props.idx * 30, props.date)
              .toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })
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

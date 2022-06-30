import React from 'react';
import { ReactElement } from 'react';
import { drop, allowDrop } from '../../utils/dragAndDrop';
import { generateTimeHHMMSS } from '../../utils/util';
import "./Row.scss"

interface RowProps {
  idx: number
  hidden: boolean
  date: number
  comp: ReactElement[]
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
          props.comp.map((component, key) => (
            <React.Fragment key={key}>
              {component}
            </React.Fragment>
          ))
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

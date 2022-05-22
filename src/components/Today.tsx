// import React from 'react';
import React, { DragEvent } from 'react';

import "./Today.css"

interface RowProps {
  idx: number
  data: number
  date: number
}

interface RowState {

}

class Row extends React.Component<RowProps, RowState> {
  constructor(props: RowProps) {
    super(props);
    // this.state = { :  };
  }
  render() {

    const test = (offset: number) => {
      let theDay = new Date(this.props.date)
      // let theDay = new Date()
      theDay.setHours(0)
      theDay.setMinutes(offset)
      theDay.setSeconds(0)
      // theDay.setTime(offset)
      // console.log(
      //   offset
      // )
      return theDay
    }

    function allowDrop(ev: any) {
      ev.preventDefault();
    }

    function drag(ev: DragEvent<HTMLDivElement>) {
      // ev.querySelector('.emptyRowFiller').hidden = false;
      // let faf = ev.target.querySelector('.emptyRowFiller')
      // let faf = ev.
      const dropZone = ev.target as HTMLDivElement;
      // console.log(
      //   (dropZone as HTMLElement), (dropZone.closest('.columnRight')!.querySelector('.emptyRowFiller') as HTMLDivElement).hidden
      // )
      // (dropZone.closest('.columnRight')!.querySelector('.emptyRowFiller') as HTMLDivElement).hidden = false
      // (dropZone.closest('.columnRight')!.querySelector('.emptyRowFiller') as HTMLDivElement).hidden = false
      // dropZone.closest('.columnRight')!.querySelector('.emptyRowFiller')!.hidden = true
      // if ((dropZone as HTMLElement).closest('.completed-task-list')) {
      // document.querySelector('.completed-task-list')?.classList.add('active');
      // }
      // dropZone.
      ev.dataTransfer.setData("text", dropZone.id);
      // ev.target.querySelector('.emptyRowFiller').style.visibility = "visible";
    }

    function drop(ev: any) {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      // ev.target.querySelector('.emptyRowFiller').style.display = '';
      [...document.querySelectorAll('.emptyRowFiller')].map((row) => (row as HTMLDivElement).hidden = false)
      ev.target.querySelector('.emptyRowFiller').hidden = true;
      ev.target.appendChild(document.getElementById(data));
      // ev.target.removeChild()
      // ev.target.innerHTML = ''
      // ev.target.append(document.getElementById(data));
      // ev.target.innerHTML = document.getElementById(data)!.innerHTML
    }

    return (
      // <div className="divTableRow">
      //   <div className="divTableCell">{this.props.idx} - {this.props.data}</div>
      //   <div className="divTableCell">{this.props.idx} - {this.props.data}</div>
      // </div>
      // <div className="divTableRow">
      //   <div className="divTableCell">{this.props.idx} - {this.props.data}</div>
      //   <div className="divTableCell">{this.props.idx} - {this.props.data}</div>
      // </div>
      <div className='row'>
        <div className='columnLeft'>
          <div className='blue-column' data-time={(this.props.idx * 30).toString()}>
            {
              // test(this.props.idx * 5).toLocaleTimeString()
              test(this.props.idx * 30).toLocaleTimeString()
            }
          </div>
        </div>
        <div className='columnRight' onDrop={drop} onDragOver={allowDrop}>
          <div className='green-column' >
            {
              this.props.idx * 30 == 720 ? (
                <><div id="food" className="food" draggable="true" onDragStart={drag}> FOOD </div>
                  <p className='emptyRowFiller' hidden> </p></>
              ) : (
                <p className='emptyRowFiller'> </p>
              )

            }
          </div>
        </div>
      </div>
    );
  }
}

// export default Row;

function Today() {
  // const rowNumber: number = 24 * (60 / 5) // (60 / 5)
  const rowNumber: number = 24 * (60 / 30) // (60 / 5)

  const render = () => {
    const now = new Date()
    // now.getTimezoneOffset(),
    console.log(
      now, now.getTimezoneOffset(), `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} 00:00:00`
    )
    // var theBigDay = new Date(`1970-01-01 00:00:00`);
    now.setFullYear(new Date().getFullYear())
    now.setMonth(new Date().getMonth())
    now.setDate(new Date().getDate())
    // var sameAsBigDay = new Date();
    // // theBigDay.setTime('00:00:00')
    // console.log(
    //   theBigDay, theBigDay.getHours()
    // )
    // sameAsBigDay.setTime(theBigDay.getTime());


    let rows = [];
    for (let i = 0; i < rowNumber; i++) {
      // <div className="divTableRow">
      // <div className="divTableCell">&nbsp;</div>
      // </div>
      rows.push(
        <Row key={i} idx={i} date={now.getTime()} data={Math.random()} />
      )
    }
    return rows
  }

  return (
    <div className="todayContainer">

      <div className="spacer"></div>
      <div className="popup">
        <div className="divTable"> {
          render()
        }
        </div>
      </div>
      <div className="spacer"></div>

    </div>
  );
}

export default Today;

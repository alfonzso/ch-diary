// import React from 'react';
import React, { DragEvent, useEffect, useState } from 'react';
import "./Today.css";


interface RowProps {
  idx: number
  data: number
  date: number
}

// interface RowState {
//   fireOnce: boolean
// }

const Row = (props: RowProps) => {
  // const [data, setData] = useState([]);
 
  useEffect(() => {
    console.log("useEffectuseEffectuseEffectuseEffectuseEffect");
    const food = document.querySelector('.food') as HTMLDivElement
    const follower = document.querySelector('.follower') as HTMLDivElement
    follower.style.left = food.offsetLeft + 'px';
    follower.style.top = (food.offsetTop - follower.offsetHeight) + 'px';
  }, []);


  const generateTimeHHMMSS = (offset: number) => {
    let theDay = new Date(props.date)
    theDay.setHours(0)
    theDay.setMinutes(offset)
    theDay.setSeconds(0)
    return theDay
  }

  const followMe = () => {
    const food = document.querySelector('.food') as HTMLDivElement
    const follower = document.querySelector('.follower') as HTMLDivElement
    myLoop(follower, food)
  }

  function myLoop(follower: HTMLDivElement, food: HTMLDivElement) {
    let i: number = 0
    let step = 10

    let foodLeftPartials = food.offsetLeft / step
    let foodTopPartials = (follower.offsetTop - (food.offsetTop - follower.offsetHeight)) / step
    const looper = (left: number, top: number) => {
      setTimeout(function () {
        follower.style.top = top - foodTopPartials + 'px';
        i++;
        if (i < step) {
          looper(left + foodLeftPartials, top - foodTopPartials);
        }
      }, 24)
    }
    looper(0, follower.offsetTop)
  }

  function allowDrop(ev: DragEvent<HTMLDivElement>) {
    ev.preventDefault();
  }

  function drag(ev: DragEvent<HTMLDivElement>) {
    ev.dataTransfer.setData("text", ev.currentTarget.id);
  }

  function drop(ev: DragEvent<HTMLDivElement>) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    [...document.querySelectorAll('.emptyRowFiller')].forEach((row) => (row as HTMLDivElement).hidden = false);
    (ev.currentTarget.querySelector('.emptyRowFiller') as HTMLDivElement)!.hidden = true;
    ev.currentTarget.appendChild(document.getElementById(data)!);
    setTimeout(followMe, 100);
  }

  const foodOrEmpty = () => {
    let foodOrEmptyDivList = []
    if (props.idx * 30 == 720) {
      foodOrEmptyDivList.push(
        <div className='foodColumn' key={props.idx} >
          <div id="food" className="food" draggable="true" onDragStart={drag}>
            FOOD
            <div className="follower">
              <p>  D01 </p>
              <p>  Nagyon finom kaja </p>
              <p>  600 Kcal | 60 g Ch </p>
            </div>
          </div><p className='emptyRowFiller' hidden> </p>
        </div>
      )
    } else {
      foodOrEmptyDivList.push(
        <div className='foodColumn' key={props.idx}  >
          <p className='emptyRowFiller'> </p>
        </div>
      )
    }
    return foodOrEmptyDivList
  }

  return (
    <div className='row'>
      <div className='columnLeft'>
        <div className='dateColumn' data-time={(props.idx * 30).toString()}>
          {
            generateTimeHHMMSS(props.idx * 30).toLocaleTimeString()
          }
        </div>
      </div>
      <div className='columnRight' onDrop={drop} onDragOver={allowDrop}>{
        foodOrEmpty()
      }
      </div>
    </div>
  );
}

function Today() {
  const rowNumber: number = 24 * (60 / 30)

  const getYYYYMMDD = () => {
    return new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`)
  }

  const render = () => {
    const now = getYYYYMMDD()
    let rows = [];
    for (let i = 0; i < rowNumber; i++) {
      rows.push(
        <Row key={i} idx={i} date={now.getTime()} data={Math.random()} />
      )
    }
    return rows
  }

  return (
    <div className="todayContainer">
      <div className="information">
        <div className="spacer"></div>
        <div className="spacer">FFF</div>
        <div className="spacer"></div>
      </div>
      <div className="tableContent">
        <div className="spacer"></div>
        <div className="popup">
          <div className="chDiaryTable"> {
            render()
          }
          </div>
        </div>
        <div className="spacer"></div>
      </div>

    </div>
  );
}

export default Today;

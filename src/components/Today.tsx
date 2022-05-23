// import React from 'react';
import React, { DragEvent, useEffect, useState } from 'react';

import "./Today.css"

interface RowProps {
  idx: number
  data: number
  date: number
}

// interface RowState {
//   fireOnce: boolean
// }

const Row = (props: RowProps) => {
  const [data, setData] = useState([]);

  // class Row extends React.Component<RowProps, RowState> {
  // handleLoad: any;
  // constructor(props: RowProps) {
  //   super(props);
  //   this.state = { fireOnce: true };
  //   this.handleLoad = this.handleLoad.bind(this);
  // }


  // getOffset(el: HTMLDivElement) {
  //   const rect = el.getBoundingClientRect();
  //   return {
  //     left: rect.left + window.scrollX,
  //     top: rect.top + window.scrollY
  //   };
  // }

  useEffect(() => {
    // fetch('exemple.com')
    //   .then((response) => response.json())
    //   .then((json) => setData(json.result)) // set returned values into the data state
    //   .catch((error) => console.error(error))
    console.log("useEffectuseEffectuseEffectuseEffectuseEffect");
    // followMe()
    const food = document.querySelector('.food') as HTMLDivElement
    const follower = document.querySelector('.follower') as HTMLDivElement
    follower.style.left = food.offsetLeft + 'px';
    follower.style.top = (food.offsetTop - follower.offsetHeight) + 'px';
  }, []);

  const getCoords = (elem: any) => {
    let box = elem.getBoundingClientRect();
    return box
    // return {
    //   top: box.top + window.pageYOffset,
    //   right: box.right + window.pageXOffset,
    //   bottom: box.bottom + window.pageYOffset,
    //   left: box.left + window.pageXOffset
    // };
  }

  // getOffset(el: any) {
  const getOffset = (el: any) => {

    var _x = 0;
    var _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      _x += el.offsetLeft - el.scrollLeft;
      _y += el.offsetTop - el.scrollTop;
      el = el!.offsetParent!;
    }
    return { top: _y, left: _x };
  }

  // componentDidMount() {
  //   console.log("componentDidMount");

  //   window.addEventListener('load', this.handleLoad);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('load', this.handleLoad)
  //   console.log("componentWillUnmount");
  // }

  // componentDidUpdate() {
  //   console.log("componentDidUpdate");
  //   // const food = document.querySelector('.food') as HTMLDivElement
  //   // const follower = document.querySelector('.follower') as HTMLDivElement
  //   // console.log(
  //   //   // this.getOffset(food).left + 'px',
  //   //   // this.getOffset(food).top + 'px',
  //   //   // this.getCoords(food).left, this.getCoords(food).top,
  //   //   // food.offsetLeft, food.offsetTop
  //   //   this.getCoords(follower)
  //   // )
  //   // // follower.style.left = this.getCoords(food).left + 'px';
  //   // // follower.style.top = this.getCoords(food).top + 'px';
  //   // follower.style.left = food.offsetLeft + 'px';
  //   // follower.style.top = (food.offsetTop - follower.offsetHeight) + 'px';
  // }

  // handleLoad() {
  //   console.log("handleLoad");
  //   if (this.state.fireOnce) {
  //     // const food = document.querySelector('.food') as HTMLDivElement
  //     // const follower = document.querySelector('.follower') as HTMLDivElement
  //     // console.log(
  //     //   // this.getOffset(food).left + 'px',
  //     //   // this.getOffset(food).top + 'px',
  //     //   // this.getCoords(food).left, this.getCoords(food).top,
  //     //   // food.offsetLeft, food.offsetTop
  //     //   this.getCoords(follower)
  //     // )
  //     // // follower.style.left = this.getCoords(food).left + 'px';
  //     // // follower.style.top = this.getCoords(food).top + 'px';
  //     // follower.style.left = food.offsetLeft + 'px';
  //     // follower.style.top = (food.offsetTop - follower.offsetHeight) + 'px';
  //     this.setState({ fireOnce: false })
  //   }
  //   // this.state.fireOnce = false
  // }
  const test = (offset: number) => {
    let theDay = new Date(props.date)
    theDay.setHours(0)
    theDay.setMinutes(offset)
    theDay.setSeconds(0)
    return theDay
  }

  const followMe = () => {
    const food = document.querySelector('.food') as HTMLDivElement
    const follower = document.querySelector('.follower') as HTMLDivElement
    // console.log(
    //   // this.getOffset(food).left + 'px',
    //   // this.getOffset(food).top + 'px',
    //   // this.getCoords(food).left, this.getCoords(food).top,
    //   // food.offsetLeft, food.offsetTop
    //   getCoords(follower)
    // )
    // follower.style.left = this.getCoords(food).left + 'px';
    // follower.style.top = this.getCoords(food).top + 'px';
    // follower.style.left = food.offsetLeft + 'px';
    // follower.style.top = (food.offsetTop - follower.offsetHeight) + 'px';
    // return true
    myLoop(follower, food)
  }

  function myLoop(follower: HTMLDivElement, food: HTMLDivElement) {
    let i: number = 0
    let step = 10

    console.log(
      "foodsss --> ", food.offsetLeft, food.offsetTop, (follower.offsetTop - (food.offsetTop - follower.offsetHeight))
    )

    let foodLeftPartials = food.offsetLeft / step
    let foodTopPartials = (follower.offsetTop - (food.offsetTop - follower.offsetHeight)) / step
    const looper = (left: number, top: number) => {
      setTimeout(function () {
        // console.log("-->", left, "-->", top)
        // 500 --> 600  : 500- 600 = -100 * -1 = 100
        // follower.style.left = left + foodLeftPartials + 'px';
        console.log(top, foodTopPartials)
        follower.style.top = top - foodTopPartials + 'px';
        // div.style.top = i + 1 + 'px'
        // div.style.left = i + 1 + 'px'
        i++;
        if (i < step) {
          // console.log(i, left + foodLeftPartials, top + foodTopPartials)
          looper(left + foodLeftPartials, top - foodTopPartials);
        }
      }, 24)
    }
    looper(0, follower.offsetTop)
  }

  function onPageLoad(ev: any) {
    // ev.preventDefault();

    // ev.currentTarget
    ev.currentTarget.style.left = 10 + 'px';
    ev.currentTarget.style.top = 20 + 'px';
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
    // followMe()
    setTimeout(followMe, 100);
  }

  return (
    // return (
    <div className='row'>
      <div className='columnLeft'>
        <div className='blue-column' data-time={(props.idx * 30).toString()}>
          {
            test(props.idx * 30).toLocaleTimeString()
          }
        </div>
      </div>
      <div className='columnRight' onDrop={drop} onDragOver={allowDrop}>
        <div className='green-column' >
          {

            props.idx * 30 == 720 ? (
              <><div id="food" className="food" draggable="true" onDragStart={drag}>
                FOOD
                <div className="follower" onLoad={onPageLoad} >
                  <p>  D01 </p>
                  <p>  Nagyon finom kaja </p>
                  <p>  600 Kcal | 60 g Ch </p>
                </div>
              </div>
                <p className='emptyRowFiller' hidden> </p></>
            ) : (
              <p className='emptyRowFiller'> </p>
            )

          }
        </div>
      </div>
    </div>
  );
  // }
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

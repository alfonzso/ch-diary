// import React from 'react';
import { useEffect } from 'react';
import { getYYYYMMDD } from '../utils/util';
import { EmptyRow } from './DiaryCommon/EmptyRow';
import { Food, foodInnerProps } from './DiaryCommon/Food';
import { ImportForm } from './DiaryCommon/ImportForm';
import { Row } from './DiaryCommon/Row';
import "./Today.css";

const Today = () => {
  const everyHalfHour: number = 24 * 2

  const dummyData: foodInnerProps[] = [
    { id: "1", name: "Nagyon de nagyon finom kaja", type: "D001", props: " 600 Kcal | 60 g Ch ", dateTime: "12" },
    { id: "2", name: "FEFEFE", type: "D123", props: " 123 Kcal | 123 g Ch ", dateTime: "16" },
    { id: "3", name: "Mátrai Borzzzasss", type: "D999", props: " 999 Kcal | 999 g Ch ", dateTime: "20" },
  ]

  // const faf = () => {
  //   dummyData.filter(data => data.dateTime === "12")
  // }

  useEffect(() => {
    console.log("Today");
    // const food = document.querySelector('.food') as HTMLDivElement
    // if (food) {
    //   const follower = document.querySelector('.follower') as HTMLDivElement
    //   follower.style.left = food.offsetLeft + 'px';
    //   follower.style.top = (food.offsetTop - follower.offsetHeight) + 'px';
    // }
    ([...document.querySelectorAll('.follower')] as HTMLDivElement[]).forEach(follower => {
      const food = follower.closest(".food") as HTMLDivElement
      follower.style.left = food.offsetLeft + 'px';
      follower.style.top = (food.offsetTop - follower.offsetHeight) + 'px';
    })
  }, []);

  const render = () => {
    const now = getYYYYMMDD()
    let rows = [];
    for (let i = 0; i < everyHalfHour; i++) {

      const food = dummyData.filter(data => data.dateTime === (i * 1 / 2).toString())[0]
      if (food) {
        rows.push(
          <Row key={i} idx={i} date={now.getTime()} comp={
            [<Food food={food} />, <EmptyRow />]
          } />
        )
      } else {
        rows.push(
          <Row key={i} idx={i} date={now.getTime()} comp={
            [<EmptyRow />]
          } />
        )
      }

    }
    return rows
  }

  return (
    <div className="todayContainer">
      <div className="information">
        <div className="spacer">LEFT</div>
        <div className="spacer">FFF</div>
        <div className="spacer importInterFoodContainer">
          <div className="spacer"> RIGHT</div>
          <button className="importInterFood" onClick={() => {
            (document.getElementById('importForm') as HTMLDivElement).hidden = false
          }} >Import</button>
          <ImportForm />

        </div>
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

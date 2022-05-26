// import React from 'react';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/hooks';
import { getTodayFoods, importToggle } from '../redux/importInterFood';
import { RootState } from '../redux/store';
import { floatAnimation, getYYYYMMDD } from '../utils/util';
import { EmptyRow } from './DiaryCommon/EmptyRow';
import { Food } from './DiaryCommon/Food';
import { ImportForm } from './DiaryCommon/ImportForm';
import { Row } from './DiaryCommon/Row';
import "./Today.css";

const Today = () => {

  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
  const diaryFood = useAppSelector(state => state.importIF.diaryFood)
  const everyHalfHour: number = 24 * 2

  // const dummyData: foodInnerProps[] = [
  //   { id: "1", name: "Nagyon de nagyon finom kaja", type: "D001", props: " 600 Kcal | 60 g Ch ", dateTime: "10" },
  //   { id: "2", name: "FEFEFE", type: "D123", props: " 123 Kcal | 123 g Ch ", dateTime: "16" },
  //   { id: "3", name: "Mátrai Borzzzasss", type: "D999", props: " 999 Kcal | 999 g Ch ", dateTime: "20" },
  // ]

  // const faf = () => {
  //   dummyData.filter(data => data.dateTime === "12")
  // }

  useEffect(() => {
    console.log("Today", getYYYYMMDD().toLocaleDateString("en-ca"), diaryFood);

    // dispatch(
    //   getTodayFoods(
    //     { user: "alfonzso", date: getYYYYMMDD().toLocaleDateString("en-ca") }
    //   )
    // );

    ([...document.querySelectorAll('.follower')] as HTMLDivElement[]).forEach(follower => {
      const food = follower.closest(".food") as HTMLDivElement
      follower.style.left = food.offsetLeft - document.querySelector('.popup')!.scrollLeft + 'px';
      follower.style.top = (food.offsetTop - document.querySelector('.popup')!.scrollTop - follower.offsetHeight) + 'px';
    })
  }, []);

  // let timeoutId: NodeJS.Timeout

  const fef = () => {
    // clearTimeout(timeoutId);
    // timeoutId = setTimeout(function () {
    console.log("Hello World");
    const popup = document.querySelector('.popup') as HTMLDivElement;
    [...document.querySelectorAll('.food')].forEach((food) => {
      const follower = food.querySelector('.follower') as HTMLDivElement;
      // floatAnimation(follower, food as HTMLDivElement, popup)
      setTimeout(() => { floatAnimation(follower, food as HTMLDivElement, popup) }, 100);
    })
    // }, 50);
  }

  const render = () => {
    const now = getYYYYMMDD()
    let rows = [];
    for (let i = 0; i < everyHalfHour; i++) {

      const hours = (i * 1 / 2)

      const food = diaryFood.filter(data => data.dateTime === hours.toString())[0]
      if (food) {
        rows.push(
          <Row key={i} idx={i} date={now.getTime()} comp={
            [<Food food={food} />, <EmptyRow />]
          } hidden={false} />
        )
      } else {
        rows.push(
          <Row key={i} idx={i} date={now.getTime()} comp={
            [<EmptyRow />]
          } hidden={hours < 7 || 22 < hours} />
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
          <button className="importInterFood" onClick={() => { dispatch(importToggle()) }} >Import</button>
          <ImportForm />

        </div>
      </div>
      <div className="tableContent">
        <div className="spacer"></div>
        <div className="popup" onScroll={(ev) => {
          ev.preventDefault();
          // const popup = document.querySelector('.popup') as HTMLDivElement;
          // [...document.querySelectorAll('.food')].forEach((food) => {
          //   const follower = food.querySelector('.follower') as HTMLDivElement;
          //   // floatAnimation(follower, food as HTMLDivElement, popup)
          //   setTimeout(() => { floatAnimation(follower, food as HTMLDivElement, popup) }, 100);
          // })
          fef()

          // timeoutId()
          // setTimeout(() => {
          //   console.log("scroll happp");

          // }, 100);

        }}>
          <div className="chDiaryTable"> {
            render()
          }
          </div>
        </div>
        <div className="spacer"></div>
      </div>

    </div >
  );
}

export default Today;

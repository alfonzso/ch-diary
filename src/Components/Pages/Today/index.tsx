import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../redux/hooks';
import { getTodayFoods, importToggle } from '../../../redux/importInterFood';
import { RootState } from '../../../redux/store';
import { getToDay, nextDay, previousDay, todayDay } from '../../../redux/today';
import { floatAnimation, getYYYYMMDD } from '../../../utils/util';
import { EmptyRow } from '../../DiaryCommon/EmptyRow';
import { Food, FoodProperite } from '../../DiaryCommon/Food';
import { ImportForm } from '../../DiaryCommon/ImportForm';
import { Row } from '../../DiaryCommon/Row';
import Table from '../../Table';
import { foodInnerProps } from '../../Table/Food';
import "./index.scss";

function sumCh<T extends { portion: number, props: FoodProperite }>(items: T[]) {
  return items.reduce(function (a, b) {
    const num: number = b.portion / b.props.gramm
    return a + (b.props.ch * num);
  }, 0);
}

const Today = () => {

  const { everyHalfHour, todayDateAsString, todayDate } = useAppSelector(state => state.today)
  const userData = useAppSelector(state => state.user.data)
  const diaryFood = useAppSelector(state => state.importIF.diaryFood)
  const [todayFoods, setTodayFoods] = useState([] as foodInnerProps[]);
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();

  useEffect(() => {
    dispatch(getToDay())
    console.log("dispatch(getToDay())");
  }, [dispatch]);

  // const renderRows = () => {
  //   const now = getYYYYMMDD()
  //   let _rows = [];
  //   for (let i = 0; i < everyHalfHour; i++) {

  //     const hours = (i * 1 / 2)

  //     const food = todayFoods.filter(data => data.dateTime === hours.toString())[0]
  //     if (food) {
  //       _rows.push(
  //         <Row key={i} idx={i} date={now.getTime()} comp={
  //           [<Food food={food} />, <EmptyRow />]
  //         } hidden={false} />
  //       )
  //     } else {
  //       _rows.push(
  //         <Row key={i} idx={i} date={now.getTime()} comp={
  //           [<EmptyRow />]
  //         } hidden={hours < 7 || 22 < hours} />
  //       )
  //     }

  //   }
  //   setRowsElement(_rows)
  // }

  useEffect(() => {
    setTodayFoods(diaryFood.filter(data => data.date === todayDateAsString))
  }, [diaryFood]);

  useEffect(() => {
    console.log("todayFoods: ", todayFoods);
    if (todayFoods.length > 0) {
      initFollowerToFood()
    }
  }, [todayFoods]);

  useEffect(() => {
    if (todayDateAsString !== "1970-01-01" && userData.nickname !== "") {
      console.log("Today", diaryFood.length, todayDate, todayDateAsString, diaryFood, everyHalfHour, userData);
      dispatch(
        getTodayFoods(
          { user: userData.nickname, date: todayDateAsString }
        )
      );

    } else {
      console.warn("Something is empty: ", todayDateAsString, userData.nickname);
    }

  }, [todayDateAsString]);

  const initFollowerToFood = () => {
    const moveToTopABit: number = -15;
    ([...document.querySelectorAll('.follower')] as HTMLDivElement[]).forEach(follower => {
      const food = follower.closest(".food") as HTMLDivElement
      follower.style.left = food.offsetLeft - document.querySelector('.chDiaryMain')!.scrollLeft + 'px';
      follower.style.top = food.offsetTop - document.querySelector('.chDiaryMain')!.scrollTop - follower.offsetHeight + moveToTopABit + 'px';
    })
  }

  const floatAnimationOnScrollEvent = () => {
    const chDiaryMain = document.querySelector('.chDiaryMain') as HTMLDivElement;
    [...document.querySelectorAll('.food')].forEach((food) => {
      const follower = food.querySelector('.follower') as HTMLDivElement;
      setTimeout(() => { floatAnimation(follower, food as HTMLDivElement, chDiaryMain) }, 100);
    })
  }

  const htmlRender = () => {
    return (
      <div className="todayContainer">

        <div className="importInterFoodContainer">
          <button className="importInterFood" onClick={() => { dispatch(importToggle()) }} > Import </button>
          <ImportForm />
        </div>

        <div className="information">
          <div className="centerColumn">

            <div className='dateChanger'>
              <div className="previousDay"> <button onClick={() => { dispatch(previousDay()) }} > &lt; </button></div>
              <div className="todayDay"> <button onClick={() => { dispatch(todayDay()) }} > {todayDateAsString} </button></div>
              <div className="nextDay"> <button onClick={() => { dispatch(nextDay()) }} > &gt; </button></div>
            </div>

            <div className="chInformation">
              <div className="sumCh">Sum ch: {Number(sumCh(todayFoods)).toFixed(2)}</div>
              <div className="leftCh">Left ch: {Number(180 - sumCh(todayFoods)).toFixed(2)}</div>
            </div>

          </div>
        </div>
        <div className="tableContent">
          <div className="chDiaryMain" onScroll={(ev) => {
            ev.preventDefault();
            floatAnimationOnScrollEvent()
          }}>
            {
              todayFoods.length > 0 && <Table foodList={todayFoods} />
            }
          </div>
        </div>

      </div >
    );
  }

  // {
  //   <Table foodList={todayFoods} />
  // }
  // {
  //   todayFoods.map((v) => {
  //     <div className="test-me"> {v.name} </div>
  //   })
  // }

  return (
    <>{
      userData.nickname && htmlRender()
    }</>
  );
}

export default Today;

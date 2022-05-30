import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/hooks';
import { getTodayFoods, importToggle } from '../redux/importInterFood';
import { RootState } from '../redux/store';
import { previousDay, todayDay, nextDay, getToDay } from '../redux/today';
import { floatAnimation, getYYYYMMDD } from '../utils/util';
import { EmptyRow } from './DiaryCommon/EmptyRow';
import { Food } from './DiaryCommon/Food';
import { ImportForm } from './DiaryCommon/ImportForm';
import { Row } from './DiaryCommon/Row';
import "./Today.css";

const Today = () => {

  // const everyHalfHour = useAppSelector(state => state.today.everyHalfHour)
  // const everyHalfHour = useAppSelector(state => state.today.everyHalfHour)
  const { everyHalfHour, todayDateAsString, todayDate } = useAppSelector(state => state.today)
  const userData = useAppSelector(state => state.user.data)
  const diaryFood = useAppSelector(state => state.importIF.diaryFood)
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
  // const everyHalfHour: number = 24 * 2

  useEffect(() => {
    dispatch(getToDay())
  }, [dispatch,]);

  useEffect(() => {
    // dispatch(getToDay())
    if (todayDateAsString !== "1970-01-01" && userData.nickname !== "") {
      console.log("Today", diaryFood.length, todayDate, todayDateAsString, diaryFood, everyHalfHour, userData);

      // if(userData.nickname){
      //   // error
      // }
      dispatch(
        getTodayFoods(
          // { user: "alfonzso", date: getYYYYMMDD().toLocaleDateString("en-ca") }
          { user: userData.nickname, date: todayDateAsString }
        )
      );

      initFollowerToFood()
    } else {
      console.warn("Something is empty: ", todayDateAsString, userData.nickname);
    }

  }, [todayDateAsString]);



  const initFollowerToFood = () => {
    ([...document.querySelectorAll('.follower')] as HTMLDivElement[]).forEach(follower => {
      const food = follower.closest(".food") as HTMLDivElement
      follower.style.left = food.offsetLeft - document.querySelector('.chDiaryMain')!.scrollLeft + 'px';
      follower.style.top = (food.offsetTop - document.querySelector('.chDiaryMain')!.scrollTop - follower.offsetHeight) + 'px';
    })
  }

  const floatAnimationOnScrollEvent = () => {
    const chDiaryMain = document.querySelector('.chDiaryMain') as HTMLDivElement;
    [...document.querySelectorAll('.food')].forEach((food) => {
      const follower = food.querySelector('.follower') as HTMLDivElement;
      setTimeout(() => { floatAnimation(follower, food as HTMLDivElement, chDiaryMain) }, 100);
    })
  }

  const render = () => {
    const now = getYYYYMMDD()
    let rows = [];
    for (let i = 0; i < everyHalfHour; i++) {

      const hours = (i * 1 / 2)

      const food = diaryFood.filter(data =>
        data.date === todayDateAsString &&
        data.dateTime === hours.toString()
      )[0]
      // console.log("diaryFood-->diaryFood-->", diaryFood);

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
        <div className='dateChanger'>
          <div className="previousDay"> <button onClick={() => { dispatch(previousDay()) }} > &lt; </button></div>
          <div className="todayDay"> <button onClick={() => { dispatch(todayDay()) }} > {todayDateAsString} </button></div>
          <div className="nextDay"> <button onClick={() => { dispatch(nextDay()) }} > &gt; </button></div>
        </div>
        <div className="spacer importInterFoodContainer">
          <div className="spacer"> RIGHT</div>
          <button className="importInterFood" onClick={() => { dispatch(importToggle()) }} >Import</button>
          <ImportForm />

        </div>
      </div>
      <div className="tableContent">
        <div className="spacer"></div>
        <div className="chDiaryMain" onScroll={(ev) => {
          ev.preventDefault();
          floatAnimationOnScrollEvent()
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

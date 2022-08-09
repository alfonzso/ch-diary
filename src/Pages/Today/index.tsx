import Table from '../../Components/Table';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks';
import { getTodayFoods, importToggle } from '../../redux/importInterFoodSlice';
import { RootState } from '../../redux/store';
import { getTodayDateAsString, previousDay, todayDay, nextDay } from '../../redux/todaySlice';
import { FoodProperite } from '../../types/interfood';
import { ImportForm } from '../../Components/Forms/Import';
import { floatAnimationOnScrollEvent } from '../../utils';
import "./index.scss";
import { setRedirectNeeded } from '../../redux/redirectSlice';
import { Redirect } from '../../Components/Redirect';
import MoveAblePopup from '../../Components/Forms/MoveAblePopup';

function sumCh<T extends { portion: number, props: FoodProperite }>(items: T[]) {
  return items.reduce(function (a, b) {
    const num: number = b.portion / b.props.gramm
    return a + (b.props.ch * num);
  }, 0);
}

const Today = () => {

  const { everyHalfHour, todayDateAsString, todayDate } = useAppSelector(state => state.today)
  const { redirectNeeded } = useAppSelector(state => state.redirect)
  const userData = useAppSelector(state => state.user.data)
  const todayFoods = useAppSelector(state => state.importIF.todayFood)
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (todayDateAsString !== "1970-01-01" && userData.nickname !== "") {
      console.log("=>> Today ==>> ", todayDate, todayDateAsString, everyHalfHour, userData);
      dispatch(
        getTodayFoods(
          { user: userData.nickname, date: todayDateAsString }
        )
      );
    } else {
      dispatch(getTodayDateAsString())
      console.warn("Something is empty: ", todayDateAsString, userData.nickname);
    }

  }, [todayDateAsString, everyHalfHour, todayDate, userData, dispatch]);

  useEffect(() => {
    if (redirectNeeded) {
      setTimeout(() => {
        dispatch(setRedirectNeeded(false))
      }, 2000);
    }
  }, [dispatch, redirectNeeded]);

  const handleMouseMove = (event: React.MouseEvent) => {
    setCoords({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const htmlRender = () => {
    return (
      <div className="todayContainer" onMouseMove={handleMouseMove} >
        {redirectNeeded && <Redirect to={'/login'} />}

        {/* <div className="importInterFoodContainer">
          <button className="importInterFood" onClick={() => { dispatch(importToggle()) }} > Import </button> */}
          <ImportForm coords={coords} />
          {/* <MoveAblePopup coords={coords} />
        </div> */}

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
          <div className="chDiaryMain" onScroll={(ev) => { ev.preventDefault(); floatAnimationOnScrollEvent() }}>{
            <Table foodList={todayFoods} />
          }</div>
        </div>

      </div >
    );
  }

  return userData.nickname ? htmlRender() : null
}

export default Today;
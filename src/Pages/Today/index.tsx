import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Table from '../../Components/Table';
import { useAppSelector } from '../../redux/hooks';
import { ImportForm } from '../../Components/Forms/Import';
import { Redirect } from '../../Components/Redirect';
import { setRedirectNeeded } from '../../redux/redirectSlice';
import { RootState } from '../../redux/store';
import { getTodayDateAsString, getTodayFoods, nextDay, previousDay, todayDay } from '../../redux/todaySlice';
import { FoodProperite } from '../../types/interfood';
import "./index.scss";

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
  const todayFoods = useAppSelector(state => state.today.todayFood)
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
  const [coords, setCoords] = useState({ left: 0, top: 0 });

  useEffect(() => {
    if (todayDateAsString !== "1970-01-01") {
      console.log("=>> Today ==>> ", todayDate, todayDateAsString, everyHalfHour);
      dispatch(
        getTodayFoods(
          { date: todayDateAsString }
        )
      );
    } else {
      dispatch(getTodayDateAsString())
      console.warn("Something is empty: ", todayDateAsString);
    }

  }, [todayDateAsString, everyHalfHour, todayDate, dispatch]);

  useEffect(() => {
    if (redirectNeeded) {
      setTimeout(() => {
        dispatch(setRedirectNeeded(false))
      }, 2000);
    }
  }, [dispatch, redirectNeeded]);

  const handleMouseMove = (event: React.MouseEvent) => {
    setCoords({
      left: event.clientX,
      top: event.clientY,
    });
  };

  const htmlRender = () => {
    return (
      <div className="todayContainer" onMouseMove={handleMouseMove} >
        {redirectNeeded && <Redirect to={'/login'} />}

        <ImportForm coords={coords} />

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
          <div className="chDiaryMain" >{
            <Table foodList={todayFoods} />
          }</div>
        </div>

      </div >
    );
  }

  return userData.nickname ? htmlRender() : null
}

export default Today;
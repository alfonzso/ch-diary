import React, { useEffect, MouseEvent } from 'react';
import fetchInstance from '../utils/fetchInstance';


function Test() {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const diaryRes = await fetchInstance("/api/v1/diary/test")
  //     console.log(
  //       diaryRes.response, diaryRes.data
  //     )
  //   }
  //   fetchData()
  // }, []);

  // const shoot = (event: MouseEventHandler<HTMLButtonElement>) => {
  const shoot = (event: MouseEvent<HTMLButtonElement>) => {
    const fetchData = async (name: string) => {
      const diaryRes = await fetchInstance(`/api/v1/diary/${name}`)
      console.log(
        diaryRes.response, diaryRes.data
      )
    }
    console.log(
      // event.currentTarget
      event.currentTarget.name
    )
    fetchData(event.currentTarget.name)
  }

  return (
    <div className="testContainer">
      <p>FAFA</p>
      <button name="test" onClick={shoot} >Test</button>
      <button name="test1" onClick={shoot} >Test1</button>
    </div>
  );
}

export default Test;

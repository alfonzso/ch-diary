import React, { useEffect, MouseEvent, useState } from 'react';
import fetchInstance from '../utils/fetchInstance';
// import  { Redirect } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

type fetchData = {
  response: Response;
  data: any;
  type?: string
}

function Test() {
  function Redirect({ to }: { to: any }) {
    let navigate = useNavigate();
    useEffect(() => {
      navigate(to);
    });
    return null;
  }
  // this.setState({ diaryRes:  });
  const [diaryRes, setDiarRes] = useState({} as fetchData)
  const [tokenError, setTokenError] = useState(false)
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
      const diaryRes: fetchData = await fetchInstance(`/api/v1/diary/${name}`)
      console.log(
        diaryRes.response, diaryRes.data, diaryRes
      )
      // return <Redirect to='/login' />
      if (diaryRes.type === 'TokenExpiredError') {
        console.log('fefefefefef')
        setTokenError(true)
      }
      setDiarRes(diaryRes)
    }
    fetchData(event.currentTarget.name)
  }

  return (
    <div className="testContainer">
      <p>FAFA</p>
      <button name="test" onClick={shoot} >Test</button>
      <button name="test1" onClick={shoot} >Test1</button>
      {tokenError && <Redirect to='/login' />}
      {/* {Object.keys(diaryRes).length != 0 &&
        <div className="diary-res">
          <p>{diaryRes.response.status}</p>
          <p>{diaryRes.data}</p>
        </div>
      } */}
    </div>
  );
}

export default Test;


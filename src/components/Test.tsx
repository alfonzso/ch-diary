import React, { useEffect, MouseEvent, useState } from 'react';
import fetchInstance from '../utils/fetchInstance';
import { useNavigate } from "react-router-dom";
import { IFetchData, IFetchInstance } from '../types/fetchInstance';
import inMemoryJwt from '../utils/inMemoryJwt';

import jwt_decode, { JwtPayload } from "jwt-decode";

function Test() {
  function Redirect({ to }: { to: any }) {
    let navigate = useNavigate();
    useEffect(() => {
      navigate(to);
    });
    return null;
  }
  // this.setState({ diaryRes:  });
  const [diaryRes, setDiarRes] = useState({} as IFetchData)
  const [isRedirect, setRedirect] = useState(false)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const diaryRes = await fetchInstance("/api/diary/test")
  //     console.log(
  //       diaryRes.response, diaryRes.data
  //     )
  //   }
  //   fetchData()
  // }, []);

  // const shoot = (event: MouseEventHandler<HTMLButtonElement>) => {
  const shoot = (event: MouseEvent<HTMLButtonElement>) => {
    const fetchData = async (name: string) => {
      const { fetchObject: diaryObject }: IFetchInstance = await fetchInstance(`/api/diary/${name}`)
      console.log(
        diaryObject.response.statusText, diaryObject.response, diaryObject.body, diaryObject
      )
      if ([401, 403].includes(diaryObject.response.status)) {
        setRedirect(true)
      }
      setDiarRes(diaryObject)
    }
    fetchData(event.currentTarget.name)
  }


  return (
    <div className="testContainer">
      <p>FAFA</p>
      <button name="test" onClick={shoot} >Test</button>
      <button name="test1" onClick={shoot} >Test1</button>
      {isRedirect && <Redirect to='/login' />}
      {diaryRes.response && diaryRes.response.ok &&
        <div className="diary-res">
          <p>{diaryRes.response.status}</p>
          <p>{diaryRes.body.message}</p>
          {/* <p>{new Date().getTime() - new Date(jwt_decode<JwtPayload>(inMemoryJwt.getToken() as string).exp!).getTime()}</p> */}
          {/* <p>{Math.floor(new Date().getTime() / 1000) - new Date(jwt_decode<JwtPayload>(inMemoryJwt.getToken() as string).exp!).getTime()}</p> */}
          <p>{
            new Date(jwt_decode<JwtPayload>(inMemoryJwt.getToken() as string).exp!).getTime() - Math.floor(new Date().getTime() / 1000)
          } second and byeee ... </p>
          <p>{Math.floor(new Date().getTime() / 1000)}</p>
          <p>{new Date(jwt_decode<JwtPayload>(inMemoryJwt.getToken() as string).exp!).getTime()}</p>
        </div>
      }
    </div>
  );
}

export default Test;


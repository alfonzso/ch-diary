import { useEffect, MouseEvent, useState } from 'react';
import fetchInstance from '../utils/fetchInstance';
import { useNavigate } from "react-router-dom";
import { IFetchData, IFetchInstance } from '../types/fetchInstance';
import inMemoryJwt from '../utils/inMemoryJwt';

import jwt_decode, { JwtPayload } from "jwt-decode";
import { chDiary, columns } from '../data/testFoodData';

// import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './Test.css'



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
      {/* <div style={{ height: 400, width: '100%' }}> */}
      <div className="header">
        <div className="item">z</div>
        {/* <div className="item">z</div> */}
        {/* </div> */}
        {/* {chDiary && chDiary.map((diary) =>
          <div className="diaryList" key={diary.id}>
            <p>{diary.userName}</p>
            <p>{diary.foodName}</p>
          </div>
        )} */}

        <div className="item dataTable" style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={chDiary}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
        <div className="item">z</div>

      </div>

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


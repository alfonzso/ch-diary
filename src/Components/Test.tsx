import { DataGrid } from "@mui/x-data-grid";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { MouseEvent, useEffect, useState } from 'react';
import { chDiarySchema } from "../data/tableSchema";
import { useFetch } from "../Hooks";
import { useAppSelector } from "../redux/hooks";
import { DiaryGetEntryNickNameResponse, DiaryTestResponse, simpleDiaryData } from '../types';
import { newFetchWithAuth, ResponseErrorHandler } from '../utils/fetchInstance';
import { Redirect } from "./Redirect";
import './Test.scss';


interface jsonplaceholderData {
  id?: number
  title?: string
}

type jsonplaceholderTodosResponse = jsonplaceholderData[] & ResponseErrorHandler
function Test() {

  const [diaryRes, setDiarRes] = useState({} as DiaryTestResponse)
  const [foodRes, setFoodRes] = useState([] as simpleDiaryData[])
  const [isRedirect, setRedirect] = useState(false)
  const data = useFetch<jsonplaceholderTodosResponse>("https://jsonplaceholder.typicode.com/todos");
  const userData = useAppSelector(state => state.user.data)

  useEffect(() => {
  }, [data]);

  useEffect(() => {

    if (userData.nickname) {
      newFetchWithAuth<DiaryGetEntryNickNameResponse>({
        url: `/api/diary/getEntry/`,
        newFetchResolve:
          (diaryObject) => {
            const newListOfDiary: simpleDiaryData[] = diaryObject.data.map(chDiary => {
              return {
                id: chDiary.id,
                date: chDiary.createdAt,
                nickname: chDiary.User.nickname,
                foodName: chDiary.Food.name,
                foodType: chDiary.Food.Interfood.InterfoodType.name,
                portion: chDiary.Food.portion,
                ...chDiary.Food.FoodProperty
              }
            })
            setFoodRes(newListOfDiary)
          }
      })
    }

  }, [userData.nickname]);

  const shoot = (event: MouseEvent<HTMLButtonElement>) => {
    newFetchWithAuth<DiaryTestResponse>({
      url: `/api/diary/${event.currentTarget.name}`,
      newFetchResolve:
        (response) => {
          console.log("newFetchResolve: ", response.data)
          setDiarRes(response)
        },
      newFetchReject:
        (err) => {
          console.log("newFetchReject error: ", err)
        },
      tokenReject:
        (err) => {
          console.log("tokenReject error: ", err)
          setRedirect(true)
        }
    })
  }

  const htmlRender = () => {
    return (
      <div className="testContainer">
        <p>FAFA</p>
        <button name="test" onClick={shoot} >Test</button>
        <button name="test1" onClick={shoot} >Test1</button>
        <button name="fafa" onClick={() => {
          // FAFA
        }} >fafa</button>
        <div>
          <p>
            acccesToken: {new Date(jwt_decode<JwtPayload>(userData.accessToken).exp!).getTime() - Math.floor(new Date().getTime() / 1000)} sec
            <br />
            refreshToken: {new Date(jwt_decode<JwtPayload>(userData.refreshToken).exp!).getTime() - Math.floor(new Date().getTime() / 1000)} sec
          </p>
          <p>{Math.floor(new Date().getTime() / 1000)}</p>
          <p>{new Date(jwt_decode<JwtPayload>(userData.accessToken).exp!).getTime()}</p>
          <p>{new Date(jwt_decode<JwtPayload>(userData.refreshToken).exp!).getTime()}</p>
        </div>

        <div className="test-header">
          <div className="item">z</div>
          <div className="item dataTable" style={{ height: 400, width: '100%' }}>
            {foodRes.length !== 0 &&
              < DataGrid
                rows={foodRes}
                columns={chDiarySchema}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            }
          </div>
          <div className="item">z</div>

        </div>

        {isRedirect && <Redirect to='/login' />}
        {diaryRes && diaryRes.data &&
          <div className="diary-res">
            <p>{diaryRes.message}</p>
            <p>{diaryRes.data.nickname}</p>
            <p>{diaryRes.data.iat}</p>
            <p>{diaryRes.data.exp}</p>
          </div>
        }

        <div className="todo-container">
          {data &&
            data.map((item, index) => {
              return <span className="span-block" key={item.id || 1 - 1}>{item.id} - {item.title}</span>;
            })
          }
        </div>

      </div>
    )
  }

  return (
    <>{
      userData.nickname && htmlRender()
    }</>
  );
}

export default Test;

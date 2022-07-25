import { DataGrid } from "@mui/x-data-grid";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { MouseEvent, useEffect, useState } from 'react';
import { chDiarySchema } from "../data/tableSchema";
import { diaryGetEntryNickNameResponse, simpleDiaryData, DiaryTestResponse } from '../types';
import { getUserDataFromStore, newFetchWithAuth } from '../utils/fetchInstance';
import { Redirect } from "../utils/Redirect";
import './Test.css';

function Test() {

  const [diaryRes, setDiarRes] = useState({} as DiaryTestResponse)
  const [foodRes, setFoodRes] = useState([] as simpleDiaryData[])
  const [isRedirect, setRedirect] = useState(false)
  // const [data] = useFetch<{ id: number, title: string }[]>("https://jsonplaceholder.typicode.com/todos");
  // const data = useFetch<{ id: number, title: string }[]>("https://jsonplaceholder.typicode.com/todos");
  // const data: { id?: string, title?: string }[] = useFetch("https://jsonplaceholder.typicode.com/todos");

  useEffect(() => {
    console.log("---> ",);

    newFetchWithAuth<diaryGetEntryNickNameResponse>({
      url: `/api/diary/getEntry/nickname/alfonzso`,
      newFetchResolve:
        (diaryObject) => {
          console.log("diaryGetEntryNickNameResponse ", diaryObject.data[0])
          // console.log(diaryObject)
          const newListOfDiary: simpleDiaryData[] = diaryObject.data.map(chDiary => {
            return {
              id: chDiary.id,
              date: chDiary.createdAt,
              nickname: chDiary.User.nickname,
              foodName: chDiary.Food.name,
              foodType: chDiary.Food.Interfood.InterfoodType.name,
              portion: chDiary.Food.portion,
              ...chDiary.Food.FoodProperite
            }
          })
          setFoodRes(newListOfDiary)
        }
    })

  }, []);

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

  return (
    <div className="testContainer">
      <p>FAFA</p>
      <button name="test" onClick={shoot} >Test</button>
      <button name="test1" onClick={shoot} >Test1</button>
      <button name="fafa" onClick={() => {
        // useFetch<apiDiaryGetEntryNickNameDate>(`/api/diary/test`)
        // newFetchWithAuth<diaryGetEntryNickNameResponse>(`/api/diary/getEntry/nickname/alfonzso`,
        //   (response) => {
        //     console.log("apiDiaryGetEntryNickName(response) ", response.data[0])
        //   }
        // )
      }} >fafa</button>
      <div className="header">
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
          <p>{diaryRes.data.userNickName}</p>
          <p>{
            new Date(
              jwt_decode<JwtPayload>(
                getUserDataFromStore().accesToken).exp!
            ).getTime() - Math.floor(new Date().getTime() / 1000)
          } second and byeee ... </p>
          <p>{Math.floor(new Date().getTime() / 1000)}</p>
          <p>{
            new Date(
              jwt_decode<JwtPayload>(
                getUserDataFromStore().accesToken).exp!
            ).getTime()
          }</p>
        </div>
      }

      <div className="fafaTest">
        {/* {data &&
          // <p  >{data[0].title}</p>
          data.map((item, index) => {
            return <p key={item.id - 1}>{item.id} - {item.title}</p>;
          })
        } */}
      </div>



    </div>
  );
}

export default Test;

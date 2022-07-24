import jwt_decode, { JwtPayload } from "jwt-decode";
import { MouseEvent, useEffect, useState } from 'react';
import { useFetch } from '../Hooks';
import { diaryGetEntryNickNameResponse, IFetchData, IFetchInstance, simpleDiaryData, diaryGetEntryNickNameDateResponse } from '../types';
import fetchInstance, { newFetch } from '../utils/fetchInstance';
import inMemoryJwt from '../utils/inMemoryJwt';
import './Test.css';

function Test() {

  const fetchData = async (url: string, callback: ((diaryObject: IFetchData) => void)) => {
    fetchInstance(url)
      .then((resp: IFetchInstance) => {
        const diaryObject: IFetchData = resp.fetchObject
        console.log(
          "---->", diaryObject.response.status
        )
        if ([401, 403].includes(diaryObject.response.status)) {
          setRedirect(true)
        }
        if (400 === diaryObject.response.status) {
          console.log(diaryObject.body.error.message)
          throw new Error(diaryObject.response.statusText, { cause: { name: "", message: diaryObject.body.error.message } })
        }
        callback(diaryObject)

      }).catch(err => {
        console.log(err)
      })
  }
  const [diaryRes, setDiarRes] = useState({} as IFetchData)
  const [foodRes, setFoodRes] = useState([] as simpleDiaryData[])
  const [isRedirect, setRedirect] = useState(false)
  // const [data] = useFetch<{ id: number, title: string }[]>("https://jsonplaceholder.typicode.com/todos");
  // const data = useFetch<{ id: number, title: string }[]>("https://jsonplaceholder.typicode.com/todos");
  // const data: { id?: string, title?: string }[] = useFetch("https://jsonplaceholder.typicode.com/todos");

  // const [chEntry] = useFetch<apiDiaryGetEntryNickname>(`${baseURL}/api/diary/getEntry/nickname/alfonzso`);
  // const chEntry = useFetch<apiDiaryGetEntryNickName>(`/api/diary/getEntry/nickname/alfonzso`);
  // const today = useFetch<apiDiaryGetEntryNickNameDate>(`/api/diary/getEntry/nickname/alfonzso/date/2022-07-21`);
  const { data: testData } = useFetch<diaryGetEntryNickNameDateResponse>(`/api/diary/test`);


  // useEffect(() => {
  // fetchData(`/api/diary/getEntry/nickname/alfonzso`, (diaryObject) => {
  //   console.log(diaryObject)
  //   const diarys: diaryData[] = diaryObject.body.data
  //   const newListOfDiary: simpleDiaryData[] = diarys.map(chDiary => {
  //     return {
  //       id: chDiary.id,
  //       date: chDiary.createdAt,
  //       nickname: chDiary.User.nickname,
  //       foodName: chDiary.Food.name,
  //       foodType: chDiary.Food.Interfood.InterfoodType.name,
  //       portion: chDiary.Food.portion,
  //       ...chDiary.Food.FoodProperite
  //     }
  //   })
  //   setFoodRes(newListOfDiary)
  // })
  // if (data.length) {
  //   console.log("---->", data[0].id)
  // }
  // if (chEntry.data) {
  //   console.log("---->", chEntry.data[0].User.nickname)
  // }

  useEffect(() => {
    console.log("---> ", testData);
    // }, [data, chEntry]);
  }, [testData]);

  interface TokenError {
    error: {
      message: string,
      reason: string, expiredAt: Date
    }
  }

  interface TokenData {
    accessToken: string
    refreshToken: string
  }

  type TokenResponse = TokenError & TokenData


  const shoot = (event: MouseEvent<HTMLButtonElement>) => {
    // fetchData(`/api/diary/${event.currentTarget.name}`, (diaryObject) => { setDiarRes(diaryObject) })
    // const test = useFetch<apiDiaryGetEntryNickNameDate>(`/api/diary/test`)
    // const resolve = (refreshTokenResponse: TokenResponse) => {
    //   if (refreshTokenResponse.error) throw new Error(JSON.stringify(refreshTokenResponse.error))
    //   inMemoryJwt.setToken(refreshTokenResponse.accessToken)
    // }
    // const reject = (err: Error) => {
    //   console.log(err)
    // }
    // fetchWrapper("/api/diary/test", resolve, reject)
  }

  return (
    <div className="testContainer">
      <p>FAFA</p>
      <button name="test" onClick={shoot} >Test</button>
      <button name="test1" onClick={shoot} >Test1</button>
      <button name="fafa" onClick={() => {
        // useFetch<apiDiaryGetEntryNickNameDate>(`/api/diary/test`)
        newFetch<diaryGetEntryNickNameResponse>(`/api/diary/getEntry/nickname/alfonzso`,
          (response) => {
            console.log("apiDiaryGetEntryNickName(response) ", response.data[0])
          }
        )
      }} >fafa</button>
      <div className="header">
        <div className="item">z</div>
        <div className="item dataTable" style={{ height: 400, width: '100%' }}>
          {/* {foodRes.length !== 0 &&
            < DataGrid
              rows={foodRes}
              columns={chDiarySchema}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          } */}
        </div>
        <div className="item">z</div>

      </div>

      {/* {isRedirect && <Redirect to='/login' />} */}
      {diaryRes.response && diaryRes.response.ok &&
        <div className="diary-res">
          <p>{diaryRes.response.status}</p>
          <p>{diaryRes.body.message}</p>
          <p>{
            new Date(jwt_decode<JwtPayload>(inMemoryJwt.getToken() as string).exp!).getTime() - Math.floor(new Date().getTime() / 1000)
          } second and byeee ... </p>
          <p>{Math.floor(new Date().getTime() / 1000)}</p>
          <p>{new Date(jwt_decode<JwtPayload>(inMemoryJwt.getToken() as string).exp!).getTime()}</p>
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

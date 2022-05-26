import { DataGrid } from '@mui/x-data-grid';
import jwt_decode, { JwtPayload } from "jwt-decode";
import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { chDiarySchema } from '../data/tableSchema';
import { diaryData, IFetchData, IFetchInstance, simpleDiaryData } from '../types';
import fetchInstance from '../utils/fetchInstance';
import inMemoryJwt from '../utils/inMemoryJwt';
import './Test.css';



function Test() {
  // const { count } = useSelector((state) => state.counter);
  // const User = useAppSelector(state => state.user.userData)
  // const dispatch = useAppDispatch()

  function Redirect({ to }: { to: any }) {
    let navigate = useNavigate();
    useEffect(() => {
      navigate(to);
    });
    return null;
  }
  const fetchData = async (url: string, callback: ((diaryObject: IFetchData) => void)) => {
    // let { fetchObject: diaryObject }: IFetchInstance
    // try {
    fetchInstance(url)
      .then((resp: IFetchInstance) => {
        const diaryObject: IFetchData = resp.fetchObject
        // } catch (error) {

        // }
        console.log(
          "---->", diaryObject.response.status
        )
        // console.log(
        //   diaryObject.response.statusText, diaryObject.response, diaryObject.body, diaryObject
        // )
        if ([401, 403].includes(diaryObject.response.status)) {
          setRedirect(true)
        }
        if (400 === diaryObject.response.status) {
          console.log(diaryObject.body.error.message)
          throw new Error(diaryObject.response.statusText, { cause: { name: "", message: diaryObject.body.error.message } })
        }
        // setDiarRes(diaryObject)
        callback(diaryObject)

      }).catch(err => {
        console.log(err)
      })
  }
  // this.setState({ diaryRes:  });
  const [diaryRes, setDiarRes] = useState({} as IFetchData)
  const [foodRes, setFoodRes] = useState([] as simpleDiaryData[])
  const [isRedirect, setRedirect] = useState(false)
  useEffect(() => {
    fetchData(`/api/diary/getEntry/nickname/alfonzso`, (diaryObject) => {
      console.log(diaryObject)
      const diarys: diaryData[] = diaryObject.body.data
      const newListOfDiary: simpleDiaryData[] = diarys.map(chDiary => {
        return {
          id: chDiary.id,
          date: chDiary.createdAt,
          // userId: 1,
          nickname: chDiary.User.nickname,
          // foodId: 1,
          foodName: chDiary.Food.name,
          foodType: chDiary.Food.Interfood.InterfoodType.name,
          portion: chDiary.Food.portion,
          ...chDiary.Food.FoodProperite
          // portion: 450,
          // gramm: 100,
          // kcal: 140,
          // portein: 47 / 4.5,
          // fat: 22 / 4.5,
          // ch: 54 / 4.5
        }
      })
      setFoodRes(newListOfDiary)
      // console.log(
      //   "-------> ", newListOfDiary, foodRes
      // )
      // setDiarRes(diaryObject)

    })
  }, []);


  useEffect(() => {
    console.log(
      "-------> ", foodRes
    )
    // setDiarRes(diaryObject)
  }, [foodRes]);

  // const shoot = (event: MouseEventHandler<HTMLButtonElement>) => {
  const shoot = (event: MouseEvent<HTMLButtonElement>) => {

    // fetchData(event.currentTarget.name)
    fetchData(`/api/diary/${event.currentTarget.name}`, (diaryObject) => { setDiarRes(diaryObject) })
    // fetchData(`/api/diary/getEntry/nickname/alfonzso`, (diaryObject) => { setFoodRes(diaryObject) })

  }

  return (
    <div className="testContainer">
      <p>FAFA</p>
      <button name="test" onClick={shoot} >Test</button>
      <button name="test1" onClick={shoot} >Test1</button>
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


    </div>
  );
}

export default Test;


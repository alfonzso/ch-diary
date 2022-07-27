import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { getYYYYMMDD } from "../../utils/util";
import { Food, foodInnerProps } from "./Food";
import { EmptyRow, Row } from "./Row";

// interface FoodNHidden {
//   Food?: foodInnerProps,
//   Hidden: boolean
// }
// interface myJsonMap {
//   [x: string]: FoodNHidden;
// }

// interface rowNFoods {
//   [x: string]: foodInnerProps
// }

interface idxHiddenFood{
  idx: number
  hidden: boolean
  food: foodInnerProps
}

interface TableProps {
  foodList: foodInnerProps[]
}

type numBoolFood = [number, boolean, (foodInnerProps | null)]

function Table({ foodList }: TableProps) {
  const { everyHalfHour } = useAppSelector(state => state.today);
  const [nowGetTime, setNowGetTime] = useState(0);
  const [lili, setLili] = useState([] as numBoolFood[]);
  const [rowAndFoods, setRowAndFoods] = useState([] as idxHiddenFood[]);

  const createHoursList = () => {
    // let liliTemp: numBoolFood[] = [];


    // let foodListAsDateTimeKey = foodList.map(v => {
    //   return { [v.dateTime]: { ...v } }
    // });

    // let litmp: {}[] = []
    let flTemp: foodInnerProps[] = []
    let foodListAsDateTimeKey: idxHiddenFood[] = [];

    foodList.map(v => {
      flTemp[parseInt(v.dateTime)] = { ...v }
    });


    [...Array(everyHalfHour).keys()].map(idx => {
      const hours = (idx * 1 / 2)
      // liliTemp.push([hours, hours < 7 || 22 < hours, null])
      foodListAsDateTimeKey.push(
        // {idx, hidden: hours < 7 || 22 < hours, food: feeee[hours]}
        // {idx, hidden: hours < 7 || 22 < hours, food: fefe.find(v => v.dateTime === hours )}
        { idx, hidden: hours < 7 || 22 < hours, food: flTemp[hours] }
      )
    })

    // const findIdx = (dTime: string) => {
    //   return liliTemp.map((v, i) => {
    //     if (v[0].toString() === dTime) return i
    //     return -1
    //   }).filter(v => v != -1)[0]
    // }

    // for (let food of foodList) {
    //   const idx = findIdx(food.dateTime)
    //   liliTemp[idx] = [liliTemp[idx][0], liliTemp[idx][1], food]
    // }



    // console.log("hoursJsonTemp: ", hoursJsonTemp)
    // console.log("hoursJsonTemp lili: ", liliTemp)
    // setHoursJson(hoursJsonTemp)
    setRowAndFoods(foodListAsDateTimeKey)
    // setLili(liliTemp)
  }

  useEffect(() => {
    setNowGetTime(getYYYYMMDD().getTime())
    createHoursList()
  }, [foodList]);

  return (
    <div className="chDiaryTable">
      {
        rowAndFoods.map((v, i) => {
          // const [hours, hidden, fff] = v
          return <Row key={i} idx={i} date={nowGetTime} food={v.food} hidden={v.hidden} />
        })
      }
    </div>
  );
}

export default Table;

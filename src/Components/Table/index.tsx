import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { getYYYYMMDD, initFollowerToFood } from "../../utils/util";
import { Food, foodInnerProps } from "./Food";
import { Row } from "./Row";

interface idxHiddenFood {
  idx: number
  hidden: boolean
  food: foodInnerProps
}

interface TableProps {
  foodList: foodInnerProps[]
}

function Table({ foodList }: TableProps) {
  const [initFollowers, setInitFollowers] = useState(false);
  const { everyHalfHour } = useAppSelector(state => state.today);
  const [nowGetTime, setNowGetTime] = useState(0);
  const [rowAndFoods, setRowAndFoods] = useState([] as idxHiddenFood[]);

  const createHoursList = useCallback(() => {
    let flTemp: foodInnerProps[] = []
    let foodListAsDateTimeKey: idxHiddenFood[] = [];

    foodList.forEach(v => {
      flTemp[parseInt(v.dateTime)] = { ...v }
    });

    [...Array(everyHalfHour).keys()].forEach((v, idx) => {
      const hours = (idx * 1 / 2)
      foodListAsDateTimeKey.push(
        { idx, hidden: hours < 7 || 22 < hours, food: flTemp[hours] }
      )
    })

    setRowAndFoods(foodListAsDateTimeKey)
    // }
  }, [everyHalfHour, foodList])

  useEffect(() => {
    setNowGetTime(getYYYYMMDD().getTime())
    createHoursList()
  }, [foodList, createHoursList]);

  useEffect(() => {
    initFollowerToFood()
  }, [rowAndFoods, initFollowers]);


  return (
    // <div className="chDiaryTable" ref={myRef}>
    <div className="chDiaryTable"  >
      {
        rowAndFoods.map((v, i) => {
          return <Row key={i} idx={i} date={nowGetTime} food={<Food food={v.food} setInitFollowers={setInitFollowers} />} hidden={v.hidden} />
        })
      }
    </div>
  );
}

export default Table;

import { DOMElement, useEffect, useRef, useState } from "react";
import { food } from "../../data/pocFoodDataSchema";
import { useAppSelector } from "../../redux/hooks";
import { getYYYYMMDD, initFollowerToFood } from "../../utils/util";
import { foodInnerProps } from "./Food";
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
  const myRef = useRef<HTMLDivElement>(null);
  const { everyHalfHour } = useAppSelector(state => state.today);
  const [nowGetTime, setNowGetTime] = useState(0);
  const [rowAndFoods, setRowAndFoods] = useState([] as idxHiddenFood[]);

  const createHoursList = () => {
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
  }

  useEffect(() => {
    setNowGetTime(getYYYYMMDD().getTime())
    createHoursList()
  }, [foodList]);

  useEffect(() => {
    initFollowerToFood()
  }, [rowAndFoods]);


  return (
    <div className="chDiaryTable" ref={myRef}>
      {
        rowAndFoods.map((v, i) => {
          return <Row key={i} idx={i} date={nowGetTime} food={v.food} hidden={v.hidden} />
        })
      }
    </div>
  );
}

export default Table;

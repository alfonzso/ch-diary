import { foodProperiteComponentProps } from "../Food/types"

const FoodProperiteComponent = (
  { foodProps, portion }: foodProperiteComponentProps
) => {
  const num: number = portion / foodProps.gramm

  const render = () => {
    return Object.entries(foodProps).map(([key, val]: [key: string, val: number]) => {
      return (
        <div className="foodPropRow" key={key}>
          <div> {key} </div> <div>{Number(val * num).toFixed(2)}</div>
        </div>
      )
    })
  }

  return (
    <div className="foodPropsContainer">
      {render()}
    </div>
  )
}

export default FoodProperiteComponent
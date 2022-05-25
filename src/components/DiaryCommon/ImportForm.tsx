import { drag } from "../../utils/dragAndDrop"


// interface foodInnerProps {
//   id: string
//   type: string
//   props: string
//   name: string
//   dateTime: string
// }

// interface foodProps {
//   food: foodInnerProps
// }

// const Food = ({ food }: foodProps) => {
const ImportForm = () => {

  return (
    <div id="importForm" className="importForm" hidden>
      <textarea name="importFoodTextArea" id="importFoodTextArea" cols={30} rows={10} ></textarea>
    </div>
  )
}

export {
  ImportForm
}
// export type { foodProps, foodInnerProps }

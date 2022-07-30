// import { ToastSucces, ToastError, removeDuplicatedElementsById,   } from "./oneliners";

import { allowDrop, drag, drop } from "./dragAndDrop";
import { ToastSucces, ToastError, removeDuplicatedElementsById } from "./oneliners";
import { floatAnimation, floatAnimationOnScrollEvent, initFollowerToFood } from "./util/myAnimation";
import { getYYYYMMDD, removeOneDay, addOneDay, generateTimeHHMMSS } from "./util/myDate";

// import { ToastSucces, ToastError, removeDuplicatedElementsById } from "./oneliners";
// import { floatAnimation } from "./util/myAnimation";

export {
  floatAnimation,
  floatAnimationOnScrollEvent,
  initFollowerToFood,

  getYYYYMMDD,
  removeOneDay,
  addOneDay,
  generateTimeHHMMSS,

  ToastSucces,
  ToastError,
  removeDuplicatedElementsById,
  
  allowDrop,
  drag,
  drop,
}
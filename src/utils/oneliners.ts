import { toast } from "react-toastify";

const removeDuplicatedElementsById = <T extends { id?: string }>(arr: T[]) => {
  return [...new Map(arr.map(v => [v.id, v])).values()]
}

const ToastSucces = (title: string) => {
  toast.success(title, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

const ToastError = (title: string) => {
  toast.error(title, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export {
  ToastSucces,
  ToastError,
  removeDuplicatedElementsById,
}

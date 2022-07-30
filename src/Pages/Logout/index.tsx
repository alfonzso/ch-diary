import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "../../Components/Redirect";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/userSlice";
import { newFetch, ResponseErrorHandler } from "../../utils/fetchInstance";
import { ToastError, ToastSucces } from "../../utils/oneliners";

function Logout() {
  const [isRedirect, setRedirect] = useState(false)
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();

  const sendLogoutToBackend = () => {
    newFetch<{} & ResponseErrorHandler>({
      url: `/api/auth/logout`,
      config: {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      },
      newFetchResolve: () => {
        ToastSucces("Logout Succeed! ")
      },
      newFetchReject: (err) => {
        ToastError("Logout Failed! ")
      }
    })
  }

  useEffect(() => {
    dispatch(
      logout()
    )
    sendLogoutToBackend()
    setRedirect(true)
  }, [dispatch]);

  return (<>
    {isRedirect && <Redirect to='/' />}
  </>
  );
}

export default Logout;
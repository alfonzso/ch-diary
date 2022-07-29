import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "../../Components/Redirect";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/user";
import { newFetch, ResponseErrorHandler } from "../../utils/fetchInstance";
import { ToastSucces } from "../../utils/util";

function Logout() {
  // const [Logout, setLogout] = useState(false);
  const [isRedirect, setRedirect] = useState(false)
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();

  const sendLogoutToBackend = () => {
    newFetch<{} & ResponseErrorHandler>({
      url: `/api/auth/login`,
      newFetchResolve: () => {
        ToastSucces("Logout Succeed! ")
      },
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
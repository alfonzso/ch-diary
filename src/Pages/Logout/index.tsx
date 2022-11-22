import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "../../Components/Redirect";
import { useAppSelector } from "../../redux/hooks";
import { logMeOut, LogoutStates, setLogoutToInitState } from "../../redux/logoutSlice";
import { RootState } from "../../redux/store";
import { ToastError, ToastSucces } from "../../utils/oneliners";

function Logout() {
  const [isRedirect, setRedirect] = useState(false)
  const { isLoggedOut, logoutError } = useAppSelector(state => state.logout)
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();

  useEffect(() => {
    dispatch(logMeOut())
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedOut === LogoutStates.SUCCES) {
      ToastSucces('Logout Succeed ')
      setRedirect(true)
      dispatch(setLogoutToInitState())
    } else if (isLoggedOut !== LogoutStates.INIT) {
      ToastError(`Logout Failed ${logoutError.message} `)
    }
  }, [isLoggedOut, logoutError, dispatch]);

  return (<>
    {isRedirect && <Redirect to='/' />}
  </>
  );
}

export default Logout;
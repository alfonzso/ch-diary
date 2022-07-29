import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "../../Components/Redirect";
import { RootState } from "../../redux/store";

function Logout() {
  // const [Logout, setLogout] = useState(false);
  const [isRedirect, setRedirect] = useState(false)
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();

  useEffect(() => {
    dispatch({
      type: "FAFA"
    })
    setRedirect(true)
  }, [dispatch]);

  return (<>
    {isRedirect && <Redirect to='/' />}
    </>
   );
}

export default Logout;
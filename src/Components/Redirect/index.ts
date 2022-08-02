import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type RedirectType = {
  to: string
}

function Redirect({ to }: RedirectType) {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

export {
  Redirect
}
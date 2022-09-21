import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Expenses from "../Expenses/Expenses";
import { authActions } from "../store/authReducer";

const WellComePage = () => {
  const islogin = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.login());
  }, [islogin]);

  return (
    <>
      <Expenses />
    </>
  );
};

export default WellComePage;

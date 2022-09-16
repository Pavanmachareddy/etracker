import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Expenses from "../Expenses/Expenses";
import { authActions } from "../store/authReducer";

const WellComePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.login());
  }, []);

  return (
    <>
      <Expenses />
    </>
  );
};

export default WellComePage;

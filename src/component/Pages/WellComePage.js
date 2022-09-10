import React from "react";
import { Link } from "react-router-dom";
import Expenses from "../Expenses/Expenses";

const WellComePage = () => {
  return (
    <>
      <div>
        <h2>Wellcome to Expense Tracker</h2>
      </div>
      <p>
        Your profile is Incomplete.
        <Link to="/completeprofile">Complete Now</Link>
      </p>
      <Expenses />
    </>
  );
};

export default WellComePage;

import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  expense: [],
  totalexpense: 0,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    expense(state, action) {
      console.log("action", action.payload);
      state.expense = [...action.payload];
    },
    addingExpense(state, action) {
      state.expense = [action.payload, ...state.expense];
    },
    totalExpense(state, action) {
      console.log("stateTotal", state.totalexpense);
      console.log("Totalaction", action.payload);
      console.log("returnS", state.totalexpense + +action.payload);
      state.totalexpense = state.totalexpense + +action.payload;
    },
    afterDeleteExpense(state, action) {
      console.log("stateTotal", state.totalexpense);
      console.log("Totalaction", action.payload);
      console.log("returnS", state.totalexpense - +action.payload);
      state.totalexpense = state.totalexpense - +action.payload;
    },
  },
});
export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;

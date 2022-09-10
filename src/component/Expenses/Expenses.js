import React, { useRef, useState } from "react";
import ExpenseList from "./ExpenseList";

const Expenses = () => {
  const dummyExpense = [
    {
      id: "e1",
      money: "100",
      description: "For health and school",
      category: "salary",
    },
  ];

  const [expense, setExpense] = useState(dummyExpense);

  const inputExpenseMoneyRef = useRef();
  const inputExpenseDescriptionRef = useRef();
  const inputExpenseCategoryRef = useRef();

  const expenseSubmitHandler = (event) => {
    event.preventDefault();

    const enteredExpenseMoney = inputExpenseMoneyRef.current.value;
    const enteredExpenseDescription = inputExpenseDescriptionRef.current.value;
    const enteredExpenseCategory = inputExpenseCategoryRef.current.value;

    const newExpense = {
      money: enteredExpenseMoney,
      description: enteredExpenseDescription,
      category: enteredExpenseCategory,

      id: Math.random().toString(),
    };
    fetch(
      "https://expense-tracker-7f0ee-default-rtdb.firebaseio.com/Expenses.json",
      {
        method: "POST",
        body: JSON.stringify(newExpense),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          alert("data sent to the backend");
          return res.json();
        } else {
          return res.json((data) => {
            throw new Error(data.error.message);
          });
        }
      })

    inputExpenseMoneyRef.current.value = "";
    inputExpenseDescriptionRef.current.value = "";
    inputExpenseCategoryRef.current.value = "";
  };
  return (
    <div>
      <h2>Enter Daily Expenses</h2>
      <form onSubmit={expenseSubmitHandler}>
        <label htmlFor="expenseMoney">Money</label>
        <input id="expenseMoney" type="text" ref={inputExpenseMoneyRef} />
        <label htmlFor="expenseDescription">Description</label>
        <input
          id="expenseDescription"
          type="text"
          ref={inputExpenseDescriptionRef}
        />
        <label htmlFor="expenseCategory">Category</label>
        <select
          name="Category"
          id="expenseCategory"
          ref={inputExpenseCategoryRef}
        >
          <option value="food">Food</option>
          <option value="petrol">Petrol</option>
          <option value="salary">Salary</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <ExpenseList items={expense} />
    </div>
  );
};

export default Expenses;

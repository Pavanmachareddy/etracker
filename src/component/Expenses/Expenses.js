import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Premium from "../Pages/Premium";
import { expenseActions } from "../store/expenseReducer";
import "./ExpenseList.css";

const Expenses = () => {
  const [expense, setExpense] = useState([]);
  const [data, setData] = useState(null);
  const [category, setCategaory] = useState("");
  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState("");
  const [refresh, setRefresh] = useState(null);
  const [premium, setPremium] = useState(false);
  const [premiumfeatures, setPremiumfeatures] = useState(false);

  const storedExpense = useSelector((state) => state.expense.expense);
  const TotalExpense = useSelector((state) => state.expense.totalexpense);
  console.log("total", TotalExpense);

  const dispatch = useDispatch();

  console.log(storedExpense, ".........");

  const moneyHandler = (e) => {
    setMoney(e.target.value);
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const categoryHandler = (e) => {
    setCategaory(e.target.value);
  };

  useEffect(() => {
    fetch(
      "https://expense-tracker2-4de07-default-rtdb.firebaseio.com/Expenses.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .then((data) => {
        console.log(data, "-----data");

        if (data !== null) {
          const storeData = [];
          for (let key in data) {
            console.log(key);
            let d = {
              id: key,
              money: data[key].money,
              description: data[key].description,
              category: data[key].category,
            };
            storeData.unshift(d);
            console.log(storeData, "---------storeData");
            console.log(d);
            dispatch(expenseActions.totalExpense(data[key].money));
            // setData(data[key].money)
          }
          dispatch(expenseActions.expense(storeData));
          setExpense([...storeData]);
          // console.log(storeData);
        } else {
          console.log("nothing to show");
        }
      });
  }, [data]);

  const expenseData = {
    money,
    description,
    category,
  };

  //Form Submit
  const expenseSubmitHandler = (event) => {
    event.preventDefault();

    console.log(expenseData, "----------exdata");

    ///for Editing
    if (editId) {
      fetch(
        `https://expense-tracker2-4de07-default-rtdb.firebaseio.com/Expenses/${editId}.json`,
        {
          method: "PUT",
          body: JSON.stringify(expenseData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          alert(" data is edited ");
          setData(res.ok);
        }
      });
    } else {
      //Post Data
      fetch(
        "https://expense-tracker2-4de07-default-rtdb.firebaseio.com/Expenses.json",
        {
          method: "POST",
          body: JSON.stringify(expenseData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            alert("data sent to the backend");
            setData(true);
            return res.json();
          } else {
            return res.json((data) => {
              throw new Error(data.error.message);
            });
          }
        })

        .catch((err) => {
          alert(err.message);
        })
        .then(() => dispatch(expenseActions.addingExpense(expenseData)));
    }
  };

  useEffect(() => {
    if (TotalExpense >= 10000) {
      setPremium(true);
    } else {
      setPremium(false);
    }
  }, [TotalExpense]);

  const activatePremiumHandler = () => {
    setPremiumfeatures(true);
  };

  ///Delete
  const deleteListHandler = (id, itemMoney) => {
    const deleted = expense.filter((item) => {
      return item.id !== id;
    });
    setExpense(deleted);
    setData(deleted);
    console.log(deleted);

    fetch(
      `https://expense-tracker2-4de07-default-rtdb.firebaseio.com/Expenses/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        dispatch(expenseActions.afterDeleteExpense(itemMoney));
        setData(res.data);
        alert(" Data is deleted plz refresh the page");
        return res.json();
      } else {
        return res.json((data) => {
          throw new Error(data.error.message);
        });
      }
    });
  };

  ////Edit
  const editHandler = (editId) => {
    console.log(editId, "-----editId");
    setEditId(editId);

    const editData = storedExpense.filter((item) => {
      return item.id === editId;
    });

    editData.map((item) => {
      console.log(item, "---item");
      setMoney(item.money);
      setCategaory(item.category);
      setDescription(item.description);
    });
    console.log(expenseData, "----expenseData");
    if (editId) {
      fetch(
        `https://expense-tracker2-4de07-default-rtdb.firebaseio.com/Expenses/${editId}.json`,
        {
          method: "PUT",
          body: JSON.stringify(expenseData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          // alert("plz refresh the page")
          setRefresh(res.ok);
        }
      });
    } else {
      //Post Data
      fetch(
        "https://expense-tracker2-4de07-default-rtdb.firebaseio.com/Expenses.json",
        {
          method: "POST",
          body: JSON.stringify(expenseData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            dispatch(expenseActions.expense(expenseData));
            return res.json();
          } else {
            return res.json((data) => {
              throw new Error(data.error.message);
            });
          }
        })

        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <div>
      <h3>Total Expense : ₹{TotalExpense}</h3>
      {premium && (
        <button type="button" onClick={activatePremiumHandler}>
          Activate Premium
        </button>
      )}
      {premiumfeatures && <Premium />}
      <h2>Enter Daily Expenses</h2>
      <form onSubmit={expenseSubmitHandler}>
        <label htmlFor="expenseMoney">Money</label>
        <input
          id="expenseMoney"
          type="number"
          value={money}
          onChange={(e) => moneyHandler(e)}
        />
        <label htmlFor="expenseDescription">Description</label>
        <input
          id="expenseDescription"
          type="text"
          value={description}
          onChange={(e) => descriptionHandler(e)}
        />
        <label htmlFor="expenseCategory">Category</label>
        <select
          name="Category"
          id="expenseCategory"
          value={category}
          onChange={(e) => categoryHandler(e)}
        >
          <option value="food">Food</option>
          <option value="petrol">Petrol</option>
          <option value="salary">Salary</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      {storedExpense.map((item) => {
        return (
          <ul key={item.id} className="ul">
            <li>Money: {item.money}</li>
            <li>Description: {item.description}</li>
            <li>Category: {item.category}</li>
            <div className="btnn">
              <button onClick={() => editHandler(item.id)}>Edit</button>
              <button onClick={() => deleteListHandler(item.id, item.money)}>
                Delete
              </button>
            </div>
          </ul>
        );
      })}
    </div>
  );
};

export default Expenses;

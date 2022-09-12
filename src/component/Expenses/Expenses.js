import React, { useEffect, useState } from "react";
import "./ExpenseList.css";

const Expenses = () => {
  const [expense, setExpense] = useState([]);
  const [category, setCategaory] = useState("");
  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState("");
  const [editForm, setEditForm] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const moneyHandler = (e) => {
    setMoney(e.target.value);
  };
  console.log(money);

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };
  console.log(description);

  const categoryHandler = (e) => {
    setCategaory(e.target.value);
  };

  console.log(category);

  useEffect(() => {
    fetch(
      "https://expense-tracker-7f0ee-default-rtdb.firebaseio.com/Expenses.json",
      {
        method: "GET",
        // body: JSON.stringify(expenseDate),
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
        console.log(data);

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

          console.log(d);
        }
        setExpense([...storeData]);
        console.log(storeData);
      });
  }, [refresh]);

  //Form Submit
  const expenseSubmitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      money,
      description,
      category,
    };
    console.log(expenseData);

    ///for Editing
    if (editId) {
      fetch(
        `https://expense-tracker-7f0ee-default-rtdb.firebaseio.com/Expenses/${editId}.json`,
        {
          method: "PUT",
          body: JSON.stringify(expenseData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          setRefresh(true);
        }
      });
    } else {
      //Post Data
      fetch(
        "https://expense-tracker-7f0ee-default-rtdb.firebaseio.com/Expenses.json",
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
            setRefresh(true);
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

  ///Delete
  const deleteListHandler = (id) => {
    const deleted = expense.filter((item) => {
      return item.id !== id;
    });
    setExpense(deleted);
    console.log(deleted);

    fetch(
      `https://expense-tracker-7f0ee-default-rtdb.firebaseio.com/Expenses/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        alert("Expense successfully deleted");
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
    console.log(editId);
    setEditId(editId);
    setEditForm(true);
    const editData = expense.filter((item) => {
      return item.id === editId;
    });
    console.log(editData);
    editData.map((item) => {
      setMoney(item.money);
      setCategaory(item.category);
      setDescription(item.description);
    });
  };

  return (
    <div>
      <h2>Enter Daily Expenses</h2>
      <form onSubmit={expenseSubmitHandler}>
        <label htmlFor="expenseMoney">Money</label>
        <input
          id="expenseMoney"
          type="text"
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
      {expense.map((item) => {
        return (
          <ul key={item.id} className="ul">
            <li>Money: {item.money}</li>
            <li>Description: {item.description}</li>
            <li>Category: {item.category}</li>
            <div className="btnn">
              <button onClick={() => editHandler(item.id)}>
                Edit
              </button>
              <button
                onClick={() => deleteListHandler(item.id)}
              >
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

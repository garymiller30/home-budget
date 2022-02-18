import fetch from "isomorphic-unfetch";
import Transaction from "../../model/transaction";
import Router from "next/router";

export default function InputForm({ type, userId }) {
  const onSubmit = async (event) => {
    event.preventDefault();
    const transaction = new Transaction();
    transaction.ownerId = userId;
    transaction.type = type;
    transaction.description = event.target.description.value;
    transaction.amount = event.target.amount.value;
    const response = await fetch("/api/transaction", {
      method: "POST",
      body: JSON.stringify(transaction),
    });
    const trans = await response.json();

    console.log("created transaction:", trans);

    Router.push("/");
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="description">Description</label>
      <input id="description" type="text" name="description" required></input>
      <label htmlFor="amount">Amount</label>
      <input
        id="amount"
        type="number"
        name="amount"
        step="0.01"
        min="0"
        required
      ></input>
      <button type="submit">Add</button>
    </form>
  );
}

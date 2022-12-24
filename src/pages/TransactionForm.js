import { useEffect, useState } from "react";
import { useFireStore } from "../hooks/useFirestore";

import './TransactionForm.css'

export default function TransactionForm({ uid }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { addDocument, response } = useFireStore("transactions")

  const handleSubmit = (e) => {
        e.preventDefault();
        addDocument({
            uid: uid,
            name: name,
            amount: amount
        })
  }

  useEffect(() => {
    if (response.success) {
      setName("");
      setAmount("");
    }
  }, [response.success])

  return (
    <div className="transactionField">
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit} className="grid">
        <label className="grid">
          <span>Transaction name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label className="grid">
          <span>Amount ($):</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <button className="btn">Add Transaction:</button>
      </form>
    </div>
  );
}

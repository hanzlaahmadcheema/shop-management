import React, { useState } from 'react';
import axios from 'axios';

const ExpenseForm = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expenseData = { description, amount, category };
    await axios.post('http://localhost:5000/api/expenses', expenseData);
    // Clear form or handle success
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="number" onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <input type="text" onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
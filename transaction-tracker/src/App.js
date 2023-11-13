import React, { useState } from 'react';

// Example Form component
function TransactionForm({
  newDescription,
  setNewDescription,
  newAmount,
  setNewAmount,
  addTransaction,
}) {
  return (
    <form>
      <label>
        Description:
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </label>
      <label>
        Amount:
        <input
          type="number"
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)}
        />
      </label>
      <button type="button" onClick={addTransaction}>
        Add Transaction
      </button>
    </form>
  );
}

// Example TransactionTable component
function TransactionTable({ transactions }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(({ id, description, amount }) => (
          <tr key={id}>
            <td>{id}</td>
            <td>{description}</td>
            <td>{amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Groceries', amount: -50 },
    { id: 2, description: 'Salary', amount: 2000 },
  ]);
  const [newDescription, setNewDescription] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const addTransaction = () => {
    const newTransaction = {
      id: transactions.length + 1,
      description: newDescription,
      amount: Number(newAmount),
    };

    setTransactions([...transactions, newTransaction]);
    setNewDescription('');
    setNewAmount('');
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Transaction Tracker</h1>

      <TransactionForm
        newDescription={newDescription}
        setNewDescription={setNewDescription}
        newAmount={newAmount}
        setNewAmount={setNewAmount}
        addTransaction={addTransaction}
      />

      <label>
        Search:
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>

      <TransactionTable transactions={filteredTransactions} />
    </div>
  );
}

export default App;

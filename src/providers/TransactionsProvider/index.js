import { createContext, useContext, useEffect, useState } from "react";
import { equals } from "ramda";

const TransactionsContext = createContext();

const LOCAL_STORAGE_KEY = "transactions";

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    try {
      const localStorageTransactions = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY)
      );
      if (localStorageTransactions) setTransactions(localStorageTransactions);
    } catch (err) {
      console.log("failed to parse local storage value");
    }
  }, []);

  const add = (newTransaction) => {
    const newTransactions = [
      ...transactions,
      {
        ...newTransaction,
        id: transactions.length + 1,
      },
    ];
    setTransactions(newTransactions);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTransactions));
  };

  const remove = (transactionId) => {
    const filteredTransaction = transactions.filter((transaction) => {
      return !(transaction.id === transactionId);
    });

    if (filteredTransaction.length === transactions.length) return false;

    setTransactions(filteredTransaction);
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(filteredTransaction)
    );
  };
  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        add,
        remove,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);

  if (context === undefined) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider"
    );
  }

  return context;
};

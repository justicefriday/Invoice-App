import { createContext, useState, useEffect } from "react";

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("invoices"));
    if (stored) {
      setInvoices(stored);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  // CRUD FUNCTIONS

  const addInvoice = (invoice) => {
    setInvoices((prev) => [...prev, invoice]);
  };

  const deleteInvoice = (id) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  const updateInvoice = (updatedInvoice) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === updatedInvoice.id ? updatedInvoice : inv
      )
    );
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        addInvoice,
        deleteInvoice,
        updateInvoice,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
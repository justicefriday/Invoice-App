import { useContext } from "react";
import { InvoiceContext } from "../context/InvoiceContext";

const Header = () => {
  const { addInvoice } = useContext(InvoiceContext);

  const handleAdd = () => {
    const newInvoice = {
      id: Math.random().toString(36).substring(2, 7).toUpperCase(),
      client: "New Client",
      date: "25 Aug 2026",
      amount: 500,
      status: "Draft",
    };

    addInvoice(newInvoice);
  };

  return (
    <header className="header">
      <div>
        <h1>Invoices</h1>
      </div>

      <button onClick={handleAdd} className="new-btn">
        + New Invoice
      </button>
    </header>
  );
};

export default Header;
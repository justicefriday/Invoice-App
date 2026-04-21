import { useState } from "react";
import InvoiceForm from "./InvoiceForm";

const Header = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <header className="header">
        <h1>Invoices</h1>

        <button onClick={() => setShowForm(true)}>
          + New Invoice
        </button>
      </header>

      {showForm && (
        <InvoiceForm onClose={() => setShowForm(false)} />
      )}
    </>
  );
};

export default Header;
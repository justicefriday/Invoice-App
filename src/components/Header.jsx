import { useState } from "react";
import InvoiceForm from "./InvoiceForm";

const Header = ({ setFilter }) => {
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <>
      <header className="header">
  <h1>Invoices</h1>

  <div className="header-right">
    <div className="filter">
      <button onClick={() => setShowFilter(!showFilter)}>
        Filter By Status
      </button>

      {showFilter && (
        <div className="filter-dropdown">
          <label>
            <input type="radio" name="filter" onChange={() => setFilter("All")} />
            All
          </label>

          <label>
            <input type="radio" name="filter" onChange={() => setFilter("Draft")} />
            Draft
          </label>

          <label>
            <input type="radio" name="filter" onChange={() => setFilter("Pending")} />
            Pending
          </label>

          <label>
            <input type="radio" name="filter" onChange={() => setFilter("Paid")} />
            Paid
          </label>
        </div>
      )}
    </div>

    <button onClick={() => setShowForm(true)} className="new-btn">
      + New Invoice
    </button>
  </div>
</header>

      {showForm && (
        <InvoiceForm onClose={() => setShowForm(false)} />
      )}
    </>
  );
};

export default Header;
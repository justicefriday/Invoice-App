import { useState, useContext } from "react";
import { InvoiceContext } from "../context/InvoiceContext";
import InvoiceCard from "../components/InvoiceCard";
import InvoiceForm from "../components/InvoiceForm";
import Sidebar from "../components/Sidebar";

// ── Filter dropdown component ──
const FilterDropdown = ({ selected, onChange }) => {
  const [open, setOpen] = useState(false);
  const OPTIONS = ["draft", "pending", "paid"];

  return (
    <div className="filter-wrapper">
      <button
        className="filter-btn"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        Filter by status
        <span style={{ color: "var(--purple)", fontSize: "10px" }}>
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <div className="filter-dropdown" role="listbox">
          {OPTIONS.map((opt) => (
            <label key={opt} className="filter-option">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onChange(opt)}
                aria-label={`Filter by ${opt}`}
              />
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Empty state ──
const EmptyState = () => (
  <div className="empty-state">
    <div style={{ fontSize: "64px", marginBottom: "24px" }}>📄</div>
    <h2>There is nothing here</h2>
    <p>
      Create an invoice by clicking the <strong>New Invoice</strong> button
      and get started.
    </p>
  </div>
);

// ── Main page ──
const InvoiceList = () => {
  const { invoices } = useContext(InvoiceContext);

  const [filter, setFilter]   = useState([]);   // [] = show all
  const [showForm, setShowForm] = useState(false);

  const toggleFilter = (status) => {
    setFilter((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  // Apply filter
  const visible = filter.length === 0
    ? invoices
    : invoices.filter((inv) => filter.includes(inv.status));

  const count = visible.length;

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">

        {/* Page header */}
        <div className="page-header">
          <div>
            <h1>Invoices</h1>
            <p>
              {count === 0
                ? "No invoices"
                : `There are ${count} total invoice${count !== 1 ? "s" : ""}`}
            </p>
          </div>

          <div className="header-actions">
            <FilterDropdown selected={filter} onChange={toggleFilter} />

            <button className="btn-new" onClick={() => setShowForm(true)}>
              <span className="btn-new-icon" aria-hidden="true">+</span>
              New Invoice
            </button>
          </div>
        </div>

        {/* Invoice list or empty state */}
        {visible.length === 0 ? (
          <EmptyState />
        ) : (
          <section className="invoice-list">
            {visible.map((inv) => (
              <InvoiceCard key={inv.id} invoice={inv} />
            ))}
          </section>
        )}

        {/* New invoice drawer */}
        {showForm && (
          <InvoiceForm onClose={() => setShowForm(false)} />
        )}

      </main>
    </div>
  );
};

export default InvoiceList;
import { useState, useContext, useEffect } from "react";
import { InvoiceContext } from "../context/InvoiceContext";

// ── Helper: calculate due date from createdAt + paymentTerms ──
const calcDueDate = (date, terms) => {
  if (!date || !terms) return "";
  const d = new Date(date);
  d.setDate(d.getDate() + Number(terms));
  return d.toISOString().split("T")[0];
};

// ── Helper: generate ID like "RT3080" ──
const makeId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const l1 = letters[Math.floor(Math.random() * 26)];
  const l2 = letters[Math.floor(Math.random() * 26)];
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${l1}${l2}${num}`;
};

// ── Reusable labelled field ──
const Field = ({ label, error, children }) => (
  <div className="field-group">
    <label className={`field-label${error ? " has-error" : ""}`}>
      {label}
      {error && <span className="error-msg">{error}</span>}
    </label>
    {children}
  </div>
);

const BLANK_ITEM = { name: "", quantity: 1, price: 0, total: 0 };

const InvoiceForm = ({ onClose, editData }) => {
  const { addInvoice, updateInvoice } = useContext(InvoiceContext);

  const [form, setForm] = useState({
    senderStreet:   "",
    senderCity:     "",
    senderPostCode: "",
    senderCountry:  "",
    clientName:     "",
    clientEmail:    "",
    clientStreet:   "",
    clientCity:     "",
    clientPostCode: "",
    clientCountry:  "",
    createdAt:      new Date().toISOString().split("T")[0],
    paymentTerms:   "30",
    description:    "",
    items:          [{ ...BLANK_ITEM }],
  });

  const [errors, setErrors] = useState({});

  // Pre-fill if editing
  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  // ── Generic field updater ──
  const set = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // ── Item row handlers ──
  const updateItem = (index, field, value) => {
    setForm((prev) => {
      const items = prev.items.map((item, i) => {
        if (i !== index) return item;
        const updated = { ...item, [field]: value };
        // Recalculate total when quantity or price changes
        updated.total = Number(updated.quantity) * Number(updated.price);
        return updated;
      });
      return { ...prev, items };
    });
  };

  const addItem = () => {
    setForm((prev) => ({ ...prev, items: [...prev.items, { ...BLANK_ITEM }] }));
  };

  const removeItem = (index) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  // ── Validation ──
 const validate = () => {
  const e = {};
  if (!form.clientName.trim())         e.clientName  = "Can't be empty";
  if (!form.clientEmail.includes("@")) e.clientEmail = "Invalid email";
  if (!form.description.trim())        e.description = "Can't be empty";
  if (!form.createdAt)                 e.createdAt   = "Required";
  if (form.items.length === 0)         e.items       = "Add at least one item";
  form.items.forEach((item, i) => {
    if (!item.name.trim())             e[`item-${i}-name`]  = "Required";
    if (Number(item.quantity) < 1)     e[`item-${i}-qty`]   = "Min 1";
    if (Number(item.price) < 0)        e[`item-${i}-price`] = "Invalid";
  });
  setErrors(e);
  return Object.keys(e).length === 0;
};

  // Build final invoice object 
  const buildInvoice = (status) => ({
    ...form,
    id:         editData?.id || makeId(),
    status,
    paymentDue: calcDueDate(form.createdAt, form.paymentTerms),
    total:      form.items.reduce((sum, item) => sum + item.total, 0),
  });

  // Save & Send (pending)
  const handleSave = () => {
    if (!validate()) return;
    const inv = buildInvoice("pending");
    editData ? updateInvoice(inv) : addInvoice(inv);
    onClose();
  };

  // Save as Draft — skips validation
  const handleDraft = () => {
    const inv = buildInvoice("draft");
    editData ? updateInvoice(inv) : addInvoice(inv);
    onClose();
  };

  const grandTotal = form.items.reduce((s, i) => s + i.total, 0);

  return (
    <>
      {/* Dark overlay behind the drawer */}
      <div className="form-overlay" onClick={onClose} />

      {/* Slide-in drawer */}
      <div
        className="invoice-form"
        role="dialog"
        aria-modal="true"
        aria-label={editData ? "Edit Invoice" : "New Invoice"}
      >
        <h2>{editData ? `Edit #${editData.id}` : "New Invoice"}</h2>

        {/* BILL FROM */}
        <section>
          <p className="form-section-title">Bill From</p>

          <Field label="Street Address" error={errors.senderStreet}>
            <input
              className={`field-input${errors.senderStreet ? " error" : ""}`}
              value={form.senderStreet}
              onChange={(e) => set("senderStreet", e.target.value)}
            />
          </Field>

          <div className="form-grid-3">
            <Field label="City">
              <input className="field-input" value={form.senderCity}
                onChange={(e) => set("senderCity", e.target.value)} />
            </Field>
            <Field label="Post Code">
              <input className="field-input" value={form.senderPostCode}
                onChange={(e) => set("senderPostCode", e.target.value)} />
            </Field>
            <Field label="Country">
              <input className="field-input" value={form.senderCountry}
                onChange={(e) => set("senderCountry", e.target.value)} />
            </Field>
          </div>
        </section>

        {/* ── BILL TO ───────────────────────────── */}
        <section>
          <p className="form-section-title">Bill To</p>

          <Field label="Client's Name" error={errors.clientName}>
            <input
              className={`field-input${errors.clientName ? " error" : ""}`}
              value={form.clientName}
              onChange={(e) => set("clientName", e.target.value)}
            />
          </Field>

          <Field label="Client's Email" error={errors.clientEmail}>
            <input
              type="email"
              className={`field-input${errors.clientEmail ? " error" : ""}`}
              value={form.clientEmail}
              onChange={(e) => set("clientEmail", e.target.value)}
              placeholder="e.g. email@example.com"
            />
          </Field>

          <Field label="Street Address">
            <input className="field-input" value={form.clientStreet}
              onChange={(e) => set("clientStreet", e.target.value)} />
          </Field>

          <div className="form-grid-3">
            <Field label="City">
              <input className="field-input" value={form.clientCity}
                onChange={(e) => set("clientCity", e.target.value)} />
            </Field>
            <Field label="Post Code">
              <input className="field-input" value={form.clientPostCode}
                onChange={(e) => set("clientPostCode", e.target.value)} />
            </Field>
            <Field label="Country">
              <input className="field-input" value={form.clientCountry}
                onChange={(e) => set("clientCountry", e.target.value)} />
            </Field>
          </div>
        </section>

        {/* ── DATES & DESCRIPTION ───────────────── */}
        <section>
          <div className="form-grid-2">
            <Field label="Invoice Date" error={errors.createdAt}>
              <input
                type="date"
                className={`field-input${errors.createdAt ? " error" : ""}`}
                value={form.createdAt}
                onChange={(e) => set("createdAt", e.target.value)}
              />
            </Field>

            <Field label="Payment Terms">
              <select
                className="field-input"
                value={form.paymentTerms}
                onChange={(e) => set("paymentTerms", e.target.value)}
              >
                <option value="1">Net 1 Day</option>
                <option value="7">Net 7 Days</option>
                <option value="14">Net 14 Days</option>
                <option value="30">Net 30 Days</option>
              </select>
            </Field>
          </div>

          <Field label="Project Description" error={errors.description}>
            <input
              className={`field-input${errors.description ? " error" : ""}`}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="e.g. Graphic Design Service"
            />
          </Field>
        </section>

        {/* ── ITEM LIST ─────────────────────────── */}
        <section>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#777F98", marginBottom: "16px" }}>
            Item List
          </h3>

          {errors.items && (
            <p className="error-msg" style={{ marginBottom: "12px" }}>{errors.items}</p>
          )}

          {/* Column headers — only show if there are items */}
          {form.items.length > 0 && (
            <div className="items-list-header">
              <span>Item Name</span>
              <span>Qty.</span>
              <span>Price</span>
              <span></span>
            </div>
          )}

          {/* Item rows */}
          {form.items.map((item, i) => (
            <div className="item-row" key={i}>
              {/* Name */}
              <input
                className={`field-input${errors[`item-${i}-name`] ? " error" : ""}`}
                value={item.name}
                onChange={(e) => updateItem(i, "name", e.target.value)}
                placeholder="Item name"
                aria-label="Item name"
              />

              {/* Quantity */}
              <input
                type="number"
                className="field-input"
                value={item.quantity}
                min="1"
                onChange={(e) => updateItem(i, "quantity", e.target.value)}
                aria-label="Quantity"
              />

              {/* Price */}
              <input
                type="number"
                className={`field-input${errors[`item-${i}-price`] ? " error" : ""}`}
                value={item.price}
                min="0"
                step="0.01"
                onChange={(e) => updateItem(i, "price", e.target.value)}
                aria-label="Price"
              />

              {/* Delete row */}
              <button
                type="button"
                className="btn-remove-item"
                onClick={() => removeItem(i)}
                aria-label={`Remove item ${i + 1}`}
              >
                🗑
              </button>
            </div>
          ))}

          {/* Grand total preview */}
          {form.items.length > 0 && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px", marginBottom: "16px" }}>
              <span style={{ fontWeight: 700 }}>
                Total: ₦{grandTotal.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
              </span>
            </div>
          )}

          <button type="button" className="btn-add-item" onClick={addItem}>
            + Add New Item
          </button>
        </section>

        {/* ── FORM ACTIONS ──────────────────────── */}
        <div className="form-actions">
          {/* Discard / Cancel */}
          <button type="button" className="btn-cancel" onClick={onClose}>
            {editData ? "Cancel" : "Discard"}
          </button>

          {/* Save as Draft — only when creating */}
          {!editData && (
            <button type="button" className="btn-draft" onClick={handleDraft}>
              Save as Draft
            </button>
          )}

          {/* Save */}
          <button type="button" className="btn-save" onClick={handleSave}>
            {editData ? "Save Changes" : "Save & Send"}
          </button>
        </div>

      </div>
    </>
  );
};

export default InvoiceForm;
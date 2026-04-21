import { useState, useContext, useEffect } from "react";
import { InvoiceContext } from "../context/InvoiceContext";

const InvoiceForm = ({ onClose, editData }) => {
  const { addInvoice, updateInvoice } = useContext(InvoiceContext);

  const [form, setForm] = useState({
    id: "",
    clientName: "",
    clientEmail: "",
    amount: "",
    description: "",
    paymentDue: "",
  });

  const [errors, setErrors] = useState({});

  // LOAD DATA FOR EDIT
  useEffect(() => {
    if (editData) {
      setForm(editData);
    }
  }, [editData]);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // clear error when typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!form.clientName.trim()) {
      newErrors.clientName = "Client name is required";
    }

    if (!form.clientEmail.includes("@")) {
      newErrors.clientEmail = "Valid email required";
    }

    if (!form.amount || Number(form.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!form.paymentDue) {
      newErrors.paymentDue = "Due date required";
    }

    return newErrors;
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editData) {
      // UPDATE → becomes Pending
      updateInvoice({
        ...form,
        status: "Pending",
      });
    } else {
      // CREATE → Draft
      addInvoice({
        ...form,
        id: Math.random().toString(36).substring(2, 7).toUpperCase(),
        status: "Draft",
        createdAt: new Date().toISOString().split("T")[0],
      });
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="invoice-form">

      <h2>{editData ? "Edit Invoice" : "New Invoice"}</h2>

      {/* CLIENT NAME */}
      <div>
        <input
          name="clientName"
          placeholder="Client Name"
          value={form.clientName}
          onChange={handleChange}
        />
        {errors.clientName && <small>{errors.clientName}</small>}
      </div>

      {/* EMAIL */}
      <div>
        <input
          name="clientEmail"
          placeholder="Client Email"
          value={form.clientEmail}
          onChange={handleChange}
        />
        {errors.clientEmail && <small>{errors.clientEmail}</small>}
      </div>

      {/* AMOUNT */}
      <div>
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />
        {errors.amount && <small>{errors.amount}</small>}
      </div>

      {/* DUE DATE */}
      <div>
        <input
          name="paymentDue"
          type="date"
          value={form.paymentDue}
          onChange={handleChange}
        />
        {errors.paymentDue && <small>{errors.paymentDue}</small>}
      </div>

      {/* DESCRIPTION */}
      <textarea
        name="description"
        placeholder="Project Description"
        value={form.description}
        onChange={handleChange}
      />

      <div className="form-actions">
        <button type="submit">
          {editData ? "Update Invoice" : "Save Invoice"}
        </button>

        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>

    </form>
  );
};

export default InvoiceForm;
import { useContext } from "react";
import { InvoiceContext } from "../context/InvoiceContext";
import StatusBadge from "./StatusBadge";

const InvoiceCard = ({ invoice }) => {
  const { deleteInvoice, updateInvoice } = useContext(InvoiceContext);

  // EDIT FUNCTION
  const handleEdit = () => {
    const updated = {
      ...invoice,
      client: "Updated Client",
      amount: invoice.amount + 100,
    };

    updateInvoice(updated);
  };

  return (
    <article className="invoice-card">
      <h3>#{invoice.id}</h3>
      <p>{invoice.client}</p>
      <p>Due {invoice.date}</p>
      <strong>${invoice.amount}</strong>

      <StatusBadge status={invoice.status} />

      {/* ACTIONS */}
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={handleEdit}>Edit</button>

        <button onClick={() => deleteInvoice(invoice.id)}>
          Delete
        </button>
      </div>
    </article>
  );
};

export default InvoiceCard;
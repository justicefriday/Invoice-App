import { useState } from "react";
import InvoiceForm from "./InvoiceForm";
import { useContext } from "react";
import { InvoiceContext } from "../context/InvoiceContext";
import StatusBadge from "./StatusBadge";
const InvoiceCard = ({ invoice }) => {
  const { deleteInvoice, updateInvoice } = useContext(InvoiceContext);

    const [openEdit, setOpenEdit] = useState(false);
    
    const handleMarkAsPaid = () => {
    if (invoice.status === "Paid") return;

    updateInvoice({
      ...invoice,
      status: "Paid",
    });
  };


  return (
       <article className="invoice-card">

      <h3>#{invoice.id}</h3>
      <p>{invoice.clientName}</p>
      <p>Due {invoice.paymentDue}</p>
      <strong>₦{invoice.amount}</strong>

      <StatusBadge status={invoice.status} />

      <div className="actions">

        <button onClick={() => setOpenEdit(true)}>
          Edit
        </button>

        <button onClick={() => deleteInvoice(invoice.id)}>
          Delete
        </button>

        {/* ONLY SHOW IF NOT PAID */}
        {invoice.status !== "Paid" && (
          <button onClick={handleMarkAsPaid}>
            Mark as Paid
          </button>
        )}

      </div>

      {openEdit && (
        <InvoiceForm
          editData={invoice}
          onClose={() => setOpenEdit(false)}
        />
      )}

    </article>
  );
};

export default InvoiceCard;
import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { InvoiceContext } from "../context/InvoiceContext";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";
import InvoiceForm from "../components/InvoiceForm";
import Sidebar from "../components/Sidebar";

const InvoiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { invoices, deleteInvoice, markAsPaid } = useContext(InvoiceContext);

  const [showModal, setShowModal] = useState(false);
  const [showEdit,  setShowEdit]  = useState(false);

  const invoice = invoices.find((inv) => inv.id === id);

  // Redirect if invoice doesn't exist (e.g. after deletion)
  if (!invoice) {
    return (
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <p style={{ color: "var(--text-muted)" }}>Invoice not found.</p>
          <button className="btn-paid" onClick={() => navigate("/")} style={{ marginTop: "24px" }}>
            Go back
          </button>
        </main>
      </div>
    );
  }

  const handleDelete = () => {
    deleteInvoice(id);
    navigate("/");
  };

  const items  = invoice.items || [];
  const total  = invoice.total ?? invoice.amount ?? 0;

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">

        {/* Back button */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          <span style={{ color: "var(--purple)" }}>‹</span>
          Go back
        </button>

        {/* Status bar */}
        <div className="detail-status-bar">
          <div className="detail-status-left">
            <span className="detail-status-label">Status</span>
            <StatusBadge status={invoice.status} />
          </div>

          <div className="detail-actions">
            {/* Edit — not available for paid invoices */}
            {invoice.status !== "paid" && (
              <button className="btn-edit" onClick={() => setShowEdit(true)}>
                Edit
              </button>
            )}

            {/* Delete — always available */}
            <button className="btn-delete" onClick={() => setShowModal(true)}>
              Delete
            </button>

            {/* Mark as paid — only for pending */}
            {invoice.status === "pending" && (
              <button className="btn-paid" onClick={() => markAsPaid(id)}>
                Mark as Paid
              </button>
            )}
          </div>
        </div>

        {/* Invoice body */}
        <div className="detail-body">

          {/* Top: ID + sender address */}
          <div className="detail-top">
            <div>
              <p className="detail-id"><span>#</span>{invoice.id}</p>
              <p className="detail-desc">{invoice.description}</p>
            </div>
            <div className="detail-address">
              <p>{invoice.senderStreet}</p>
              <p>{invoice.senderCity}</p>
              <p>{invoice.senderPostCode}</p>
              <p>{invoice.senderCountry}</p>
            </div>
          </div>

          {/* Meta: dates + client */}
          <div className="detail-meta">

            <div>
              <p className="detail-meta-label">Invoice Date</p>
              <p className="detail-meta-value">{invoice.createdAt}</p>

              <p className="detail-meta-label" style={{ marginTop: "32px" }}>Payment Due</p>
              <p className="detail-meta-value">{invoice.paymentDue}</p>
            </div>

            <div>
              <p className="detail-meta-label">Bill To</p>
              <p className="detail-meta-value">{invoice.clientName}</p>
              <div className="detail-address" style={{ marginTop: "8px" }}>
                <p>{invoice.clientStreet}</p>
                <p>{invoice.clientCity}</p>
                <p>{invoice.clientPostCode}</p>
                <p>{invoice.clientCountry}</p>
              </div>
            </div>

            <div>
              <p className="detail-meta-label">Sent To</p>
              <p className="detail-meta-value">{invoice.clientEmail}</p>
            </div>

          </div>

          {/* Items table */}
          <div className="items-table">
            <div className="items-header">
              <span>Item Name</span>
              <span className="text-center">QTY.</span>
              <span className="text-right">Price</span>
              <span className="text-right">Total</span>
            </div>

            {items.length > 0 ? (
              items.map((item, i) => (
                <div className="items-row" key={i}>
                  <span>{item.name}</span>
                  <span className="item-qty text-center">{item.quantity}</span>
                  <span className="item-price text-right">
                    ₦{Number(item.price).toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-right">
                    ₦{Number(item.total).toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))
            ) : (
              <p style={{ color: "var(--text-muted)" }}>No items listed.</p>
            )}
          </div>

          {/* Grand total */}
          <div className="items-total">
            <span className="items-total-label">Grand Total</span>
            <span className="items-total-amount">
              ₦{Number(total).toLocaleString("en-GB", { minimumFractionDigits: 2 })}
            </span>
          </div>

        </div>

        {/* Delete modal */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleDelete}
          invoiceId={invoice.id}
        />

        {/* Edit form drawer */}
        {showEdit && (
          <InvoiceForm
            editData={invoice}
            onClose={() => setShowEdit(false)}
          />
        )}

      </main>
    </div>
  );
};

export default InvoiceDetails;
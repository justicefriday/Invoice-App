import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const InvoiceCard = ({ invoice }) => {
  const navigate = useNavigate();


  return (
    <article
      className="invoice-card"
      onClick={() => navigate(`/invoice/${invoice.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") navigate(`/invoice/${invoice.id}`);
      }}
      aria-label={`Open invoice ${invoice.id}`}
    >
      <span className="invoice-id">
        <span>#</span>{invoice.id}
      </span>

      <span className="invoice-due">
        Due {invoice.paymentDue}
      </span>

      <span className="invoice-client">
        {invoice.clientName}
      </span>

      <span className="invoice-amount">
        ₦{Number(invoice.total || invoice.amount || 0)
            .toLocaleString("en-GB", { minimumFractionDigits: 2 })}
      </span>

      <span className="invoice-status">
        <StatusBadge status={invoice.status} />
      </span>

      <span className="card-arrow" aria-hidden="true">›</span>
    </article>
  );
};

export default InvoiceCard;
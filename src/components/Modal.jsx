import { useEffect } from "react";

const Modal = ({ isOpen, onClose, onConfirm, invoiceId }) => {

  // to foCus ESC key handler
  useEffect(() => {
    if (!isOpen) return;

    const modal = document.querySelector('[role="dialog"]');
    const focusable = modal.querySelectorAll(
      'button, [href], input, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    const trap = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    document.addEventListener("keydown", trap);
    first?.focus();

    return () => document.removeEventListener("keydown", trap);
  }, [isOpen, onClose]);

  
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete invoice{" "}
          <strong>#{invoiceId}</strong>? This action cannot be undone.
        </p>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-delete" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
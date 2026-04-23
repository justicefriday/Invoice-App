// Always pass status in lowercase: "paid" | "pending" | "draft"
const StatusBadge = ({ status }) => {
  const key = (status || "draft").toLowerCase();
  return (
    <span className={`status-badge ${key}`}>
      <span className="status-dot" />
      {key.charAt(0).toUpperCase() + key.slice(1)}
    </span>
  );
};

export default StatusBadge;
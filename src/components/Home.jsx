import { useContext, useState } from "react";
import { InvoiceContext } from "../context/InvoiceContext";
import InvoiceCard from "../components/InvoiceCard";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const { invoices } = useContext(InvoiceContext);
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? invoices
      : invoices.filter((inv) => inv.status === filter);

  return (
    <div className="app-layout">
      <Sidebar />

          <main className="main-content">
              
        <Header setFilter={setFilter} />

        <section className="invoice-list">
          {filtered.length === 0 ? (
            <p>No invoices found</p>
          ) : (
            filtered.map((inv) => (
              <InvoiceCard key={inv.id} invoice={inv} />
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
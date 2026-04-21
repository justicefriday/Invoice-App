import { useContext } from "react";
import { InvoiceContext } from "../context/InvoiceContext";
import InvoiceCard from "../components/InvoiceCard";
import Header from "../components/Header";

const Home = () => {
  const { invoices } = useContext(InvoiceContext);

  return (
    <main className="app">
      <Header />

      <section className="invoice-list">
        {invoices.length === 0 ? (
          <p>No invoices yet</p>
        ) : (
                 invoices.map((invoice) => (
                          
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))
        )}
      </section>
    </main>
  );
};

export default Home;


import { useContext } from "react";
import { InvoiceContext } from "../context/InvoiceContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import InvoiceCard from "../components/InvoiceCard";


const InvoiceList = () => {
  const { invoices } = useContext(InvoiceContext);

  return (
    <>
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Header />

        <section className="invoice-list">
          {invoices.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </section>
      </main>
    </div>
    </>
  )
}

export default InvoiceList
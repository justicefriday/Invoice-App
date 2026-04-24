import { createContext, useState, useEffect } from "react";

export const InvoiceContext = createContext();

// Seed invoices to be shown we emPty
const SEED = [
  {
    id: "XM9141",
    clientName: "Alex Grim",
    clientEmail: "alexgrim@mail.com",
    senderStreet: "19 Union Terrace",
    senderCity: "London",
    senderPostCode: "E1 3EZ",
    senderCountry: "United Kingdom",
    clientStreet: "84 Church Way",
    clientCity: "Bradford",
    clientPostCode: "BD1 9PB",
    clientCountry: "United Kingdom",
    createdAt: "2021-08-21",
    paymentTerms: "30",
    paymentDue: "2021-09-20",
    description: "Graphic Design",
    items: [
      { name: "Banner Design", quantity: 1, price: 156, total: 156 },
      { name: "Email Design",  quantity: 2, price: 200, total: 400 },
    ],
    total: 556,
    status: "pending",
  },
  {
    id: "RT3080",
    clientName: "Jensen Huang",
    clientEmail: "jensenh@mail.com",
    senderStreet: "19 Union Terrace",
    senderCity: "London",
    senderPostCode: "E1 3EZ",
    senderCountry: "United Kingdom",
    clientStreet: "106 Kendell Street",
    clientCity: "Sharrington",
    clientPostCode: "NR24 5WQ",
    clientCountry: "United Kingdom",
    createdAt: "2021-08-18",
    paymentTerms: "1",
    paymentDue: "2021-08-19",
    description: "Re-branding",
    items: [{ name: "Brand Guidelines", quantity: 1, price: 1800.90, total: 1800.90 }],
    total: 1800.90,
    status: "paid",
  },
  {
    id: "RG0314",
    clientName: "John Morrison",
    clientEmail: "jm@myco.com",
    senderStreet: "19 Union Terrace",
    senderCity: "London",
    senderPostCode: "E1 3EZ",
    senderCountry: "United Kingdom",
    clientStreet: "3 Frederick Street",
    clientCity: "Lossiemouth",
    clientPostCode: "AB56 1RP",
    clientCountry: "United Kingdom",
    createdAt: "2021-09-24",
    paymentTerms: "7",
    paymentDue: "2021-10-01",
    description: "Website Redesign",
    items: [{ name: "Website Redesign", quantity: 1, price: 14002.33, total: 14002.33 }],
    total: 14002.33,
    status: "draft",
  },
];

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState(() => {
    // Load from localStorage — fall back to SEED if nothing saved yet
    try {
      const stored = localStorage.getItem("invoices");
      return stored ? JSON.parse(stored) : SEED;
    } catch {
      return SEED;
    }
  });

  // Persist every change to localStorage
  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);


  const addInvoice    = (inv)  => setInvoices((p) => [...p, inv]);
  const deleteInvoice = (id)   => setInvoices((p) => p.filter((i) => i.id !== id));

    const updateInvoice = (inv) =>setInvoices((p) => p.map((i) =>  i.id === inv.id   ? { ...inv, status: i.status === "paid" ? "paid" : inv.status }
      : i
  ));
  const markAsPaid    = (id)   => setInvoices((p) => p.map((i) => i.id === id ? { ...i, status: "paid" } : i));

  return (
    <InvoiceContext.Provider value={{ invoices, addInvoice, deleteInvoice, updateInvoice, markAsPaid }}>
      {children}
    </InvoiceContext.Provider>
  );
};
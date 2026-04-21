// ============================================================
//  App.jsx
//  Sets up React Router routes and wraps pages in the layout.
//  The <Header> is always visible.
//  Routes swap the main content area.
// ============================================================

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { InvoiceProvider } from "./context/InvoiceContext";
import Header from "./components/Header";
import InvoiceList from "./pages/InvoiceList";
import InvoiceDetail from "./pages/InvoiceDetail";

export default function App() {
  return (
    // ThemeProvider and InvoiceProvider wrap EVERYTHING
    // so every component can access theme and invoices
    <ThemeProvider>
      <InvoiceProvider>
        <BrowserRouter>
          <div className="app-layout">

            {/* Sidebar / top bar — always rendered */}
            <Header />

            {/* Main content — swaps based on the URL */}
            <main className="main-content">
              <Routes>
                {/* Home: invoice list */}
                <Route path="/" element={<InvoiceList />} />

                {/* Detail: single invoice */}
                <Route path="/invoice/:id" element={<InvoiceDetail />} />

                {/* 404 fallback */}
                <Route path="*" element={
                  <p style={{ color: "var(--text-muted)", textAlign: "center", paddingTop: "64px" }}>
                    Page not found.
                  </p>
                } />
              </Routes>
            </main>

          </div>
        </BrowserRouter>
      </InvoiceProvider>
    </ThemeProvider>
  );
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { InvoiceProvider } from "./context/InvoiceContext";
import InvoiceList from "./pages/InvoiceList";
import InvoiceDetails from "./pages/InvoiceDetails";

const App = () => {
  return (
    <ThemeProvider>
      <InvoiceProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/"            element={<InvoiceList />} />
            <Route path="/invoice/:id" element={<InvoiceDetails />} />
          </Routes>
        </BrowserRouter>
      </InvoiceProvider>
    </ThemeProvider>
  );
};

export default App;
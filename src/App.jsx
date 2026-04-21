import { BrowserRouter, Routes, Route } from "react-router-dom";
import InvoiceList from "./pages/InvoiceList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InvoiceList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import OTPPage from "./pages/OTPPage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/otp" element={<OTPPage />} />
          <Route path="/cart-list" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

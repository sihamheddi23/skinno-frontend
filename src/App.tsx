import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ProductAdmin from "./pages/ProductAdmin";
import SearchProductsPage from "./pages/SearchProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AIChatPage from "./pages/AIChatPage";
import OrdersPage from "./pages/OrdersPage";
import CompanyInfoPage from "./pages/companyInfoAdmin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div >
     <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchProductsPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/assisstant" element={<AIChatPage />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/products" element={<ProductAdmin />} />
          <Route path="/dashboard/orders" element={<OrdersPage />} />
          <Route
            path="/dashboard/about-company"
            element={<CompanyInfoPage />}
          />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;

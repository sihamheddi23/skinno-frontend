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
import IsNotAuthRoute from "./components/routes/IsNotAuthRoute";
import IsAuthRoute from "./components/routes/IsAuthRoute";
import OwnCompanyRoute from "./components/routes/OwnCompanyRoute";
import WelcomeAIAssisstant from "./pages/WelcomeAIAssisstantPage";
import AddOrUpdateProduct from "./pages/AddOrUpdateProduct";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route element={<IsNotAuthRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route path="/search" element={<SearchProductsPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />

          <Route element={<IsAuthRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route element={<OwnCompanyRoute />}>
              <Route path="/dashboard/products" element={<ProductAdmin />} />
              <Route path="/dashboard/add-product" element={<AddOrUpdateProduct />} />
              <Route path="/dashboard/products/:id" element={<AddOrUpdateProduct />} />

              <Route path="/dashboard/orders" element={<OrdersPage />} />
            </Route>
           
            <Route path="/assisstant/welcome" element={<WelcomeAIAssisstant />} />
            <Route path="/assisstant/chat/:slug" element={<AIChatPage />} />
            <Route
              path="/dashboard/about-company"
              element={<CompanyInfoPage />}
            />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;

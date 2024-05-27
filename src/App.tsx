import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ProductAdmin from './pages/ProductAdmin';
import SearchProductsPage from './pages/SearchProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AIChatPage from './pages/AIChatPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchProductsPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage/>} />
          <Route path="/assisstant" element={<AIChatPage />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/products" element={<ProductAdmin />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

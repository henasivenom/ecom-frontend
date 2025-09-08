
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Books from './pages/Books';
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';
import PaymentForm from './pages/PaymentForm';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="pb-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/books" element={<Books />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/payment" element={<PaymentForm />} />
            </Routes>
          </div>
        </div>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#ffffff',
              color: '#1f2937',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              borderRadius: '0.75rem',
              padding: '1rem',
              fontSize: '0.875rem',
            },
          }}
        />
      </Router>
    </CartProvider>
  );
}

export default App;

import Canvas from './canvas';
import Customizer from './pages/Customizer';
import Home from './pages/Home';
import {BrowserRouter, Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import Root from './routes/root';
import Login from './routes/login';
import Register from './routes/register';
import ErrorPage from './error-page';
import MainPage from './components/products/mainpage';
import CheckoutPage from './checkout';
import { useSnapshot } from 'valtio';
import state from './store/index'; 
import User from './user';
import OrderDetailsPage from './order';
<<<<<<< HEAD
import OrderConfirmed from './orderConfirm';
=======
import { useEffect } from 'react';
import OrderConfirmedPage from './orderConfirm';
>>>>>>> d8915d8414462c2b6d12f502e229732aad3f627e

function BoutiqueGPT() {
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  },[])

  return (
    <main className="app transition-all ease-in">
      <Home />
      <Canvas />
      <Customizer />
    </main>
  );
}

function App() {
  const token = localStorage.getItem('token');

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="products" element={<MainPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="register" element={<Register />} />
          <Route path="orderConfirm" element={<OrderConfirmed />} />
          <Route path="login" element={<Login />} />
          <Route
            path="userInfo"
            element={token ? <User /> : <Navigate to="/login" replace />}
          />
          <Route path="orders" element={<OrderDetailsPage />} />
          <Route path="/BoutiqueGPT" element={<BoutiqueGPT />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App

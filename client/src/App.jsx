import Canvas from './canvas';
import Customizer from './pages/Customizer';
import Home from './pages/Home';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
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

function BoutiqueGPT(){
  return(
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
          <Route
            path="login"
            element={token ? <Navigate to="/userInfo" replace /> : <Login />}
          />
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

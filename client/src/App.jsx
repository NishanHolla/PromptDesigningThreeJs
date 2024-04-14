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
  const snap = useSnapshot(state);
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Root />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="products" element={<MainPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={snap.isLoggedIn ? <Navigate to="/userInfo" replace/> : <Login />} />
        <Route path="userInfo" element={snap.isLoggedIn ? <User /> : <Login />} />
        <Route path='/BoutiqueGPT' element={<BoutiqueGPT/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App

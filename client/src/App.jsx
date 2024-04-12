import Canvas from './canvas';
import Customizer from './pages/Customizer';
import Home from './pages/Home';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Root from './routes/root';
import Login from './routes/login';
import Register from './routes/register';
import ErrorPage from './error-page';
import MainPage from './components/products/mainpage';
import Checkout from './components/checkout';

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
  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Root />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="products" element={<MainPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="/auth" element={<PrivateRoute />} >
            <Route path="checkout" element={<Checkout />} />
            <Route path="BoutiqueGPT" element={<BoutiqueGPT />} />
        </Route> 
        </Routes>
      </BrowserRouter>
  );
}


export default App

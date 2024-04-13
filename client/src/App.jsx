import Canvas from './canvas';
import Customizer from './pages/Customizer';
import Home from './pages/Home';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Root from './routes/root';
import Login from './routes/login';
import Register from './routes/register';
import ErrorPage from './error-page';
import MainPage from './components/products/mainpage';
import CheckoutPage from './checkout';
import { proxy,useSnapshot } from 'valtio';
import state from './store/index'; 

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
  const { isLoggedIn } = useSnapshot(state);
  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Root />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="products" element={<MainPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path='/BoutiqueGPT' element={<BoutiqueGPT/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}


export default App

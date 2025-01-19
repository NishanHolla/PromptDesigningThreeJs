// import Canvas from './canvas';
// import Customizer from './pages/Customizer';
import Home from "./pages/Home";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Root from "./root";
import Login from "./login";
import Register from "./register";
import ErrorPage from "./error-page";
import MainPage from "./components/products/mainpage";
import CheckoutPage from "./checkout";
import User from "./user";
import OrderDetailsPage from "./order";
import OrderConfirmed from "./orderConfirm";

function App() {
  const token = localStorage.getItem("token");

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

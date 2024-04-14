import Product from './product';
import products from "./items";
import Navbar from "../navbar";
import banner from '/src/assets/banner.gif';

interface ProdType {
  id: number;
  image: string;
  name: string;
  description: string;
  price: string;
}

// const image = 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6df84585956631.6065d580967ea.gif';
function MainPage() {
  return (
    <div className="product-container">
      <header>
        <Navbar/>
      </header>
      <h1 className="title">Welcome to the only 3D shopping site</h1>
      <img src={banner} className="product-banner" alt={name} />
        <div className="products-list">
        {products.map((products) => (
          <Product key={products.id} {...products as ProdType} />
        ))}
      </div>
    </div>
  );
}

export default MainPage;

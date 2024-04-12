import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/navbar';
import Slideshow from '../components/slideshow';
import prd1 from '../images/product1.png';
import prd2 from '../images/product2.png';
import prd3 from '../images/product3.png';
import prd4 from '../images/product4.png';
import Footer from '../components/footer';

const img_size = {
  width:"50%",
  height: "50%"
};

function Root() {
  return (
    <div className="App">
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <div style={{justifyItems:"flex"}}>
          <Slideshow></Slideshow>
          <div style={{display:"inline-flex"}}>
            <img src={prd1} style={img_size}></img>
            <img src={prd2} style={img_size}></img>
            <img src={prd3} style={img_size}></img>
            <img src={prd4} style={img_size}></img>          
          </div>
        </div>
      </main>
      <footer style={{backgroundColor:"pink"}}>
        <Footer></Footer>
      </footer>
    </div>
  );
}

export default Root;

import React from "react";
import Main from '../images/mainlogo.png';
import cart from '../images/shopping-cart.png';
import user from '../images/user.png';
import { Link } from "react-router-dom";

function Navbar(){
    return(
    <div>
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "pink", height: "24px" }}>
      <div className="navbar-collapse d-flex justify-content-center">
        <a className="navbar floatingbanner" href="/">Free shipping for orders above Rs.999</a>
      </div>
    </nav>
    <nav class="navbar navbar-expand-lg">
      <a class="navbar-brand" href="/">
        <img src={Main} className="main"></img>
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div>
          <Link className="nav-item" to='/products'>
            DRESSES
          </Link>
          <Link className="nav-item" to='/products'>
            JEWELERY
          </Link>
          <Link className="nav-item" to='/products'>
            SHIRTS
          </Link>
          <Link className="nav-item" to='/products'>
            SUNGLASSES
          </Link>
          <Link className="colorful-text" to='/BoutiqueGPT'>
            Prompt Designing
          </Link>
        <aside>
        <input class="form-control mr-sm-2" id="searchbar" type="search" placeholder="What am i wearing next ..." aria-label="Search" />
        <Link to='/checkout'>
          <img src={cart} className="icon"></img>
        </Link>
        <Link to="/login">
          <img src={user} style={{right:"10px"}} className="icon"></img>
        </Link>
        </aside>
      </div>
    </nav>
    </div>
    );
}

export default Navbar;
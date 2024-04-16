import React, { useState } from "react";
import Main from '../images/mainlogo.png';
import cart from '../images/shopping-cart.png';
import user from '../images/user.png';
import { Link, useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import store from '../store/index';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navbar() {
  const token = localStorage.getItem('token');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () =>{
    localStorage.removeItem('token');
    store.isLoggedIn = false;
    store.email = '';
    store.username = '';
    navigate('/');
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "pink", height: "24px" }}>
        <div className="navbar-collapse d-flex justify-content-center">
          <a className="navbar floatingbanner" href="/">Free shipping for orders above Rs.999</a>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="/">
          <img src={Main} className="main" alt="Main Logo" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div>
          <Link className="nav-item" to='/products'>
            DRESSES
          </Link>
          <Link className="nav-item" to='/products'>
            JEWELRY
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
            <input className="form-control mr-sm-2" id="searchbar" type="search" placeholder="What am i wearing next ..." aria-label="Search" />
            <Link to='/checkout'>
              <img src={cart} className="icon" alt="Cart" />
            </Link>
            <div className="icon" style={{right:"5px",top:"8px"}}>
            {token ? (
              <NavDropdown title={<img src={user} className="icon" style={{position:"absolute", right:"25px", top:"2px"}} alt="User" />} id="basic-nav-dropdown" show={showUserMenu} onClick={() => setShowUserMenu(!showUserMenu)}>
                <NavDropdown.Item href="/userinfo">User Info</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/orders">My Orders</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>  
            ) : ( 
              <Link to="/login"><Button variant="outline-primary">Login</Button></Link>
            )} 
            </div>
          </aside>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Button, Menu, MenuItem, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import store from '../store/index';
import Main from '../images/mainlogo.png';

function Navbar() {
  const token = localStorage.getItem('token');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    store.isLoggedIn = false;
    store.email = '';
    store.username = '';
    navigate('/');
  };

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: 'pink', height: '32px' }}>
        <Toolbar style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body2" component="div" sx={{ color: 'black' }}>
            <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Free shipping for orders above Rs.999
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
      <AppBar position="static" style={{ backgroundColor: '#FFF' }}>
        <Toolbar>
          <Link to="/">
            <img src={Main} className="main" alt="Main Logo" style={{ marginRight: '16px' }} />
          </Link>
          <Link to="/products" className="nav-item" style={{ color: 'black', textDecoration: 'none', marginRight: '16px' }}>
            DRESSES
          </Link>
          <Link to="/products" className="nav-item" style={{ color: 'black', textDecoration: 'none', marginRight: '16px' }}>
            JEWELRY
          </Link>
          <Link to="/products" className="nav-item" style={{ color: 'black', textDecoration: 'none', marginRight: '16px' }}>
            SHIRTS
          </Link>
          <Link to="/products" className="nav-item" style={{ color: 'black', textDecoration: 'none', marginRight: '16px' }}>
            SUNGLASSES
          </Link>
          <Link to="/BoutiqueGPT" className="colorful-text" style={{ color: 'black', textDecoration: 'none', marginRight: '16px' }}>
            Prompt Designing
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <InputBase
              placeholder="What am I wearing next ..."
              inputProps={{ 'aria-label': 'search' }}
              style={{ backgroundColor: '#f1f1f1', borderRadius: '4px', padding: '4px 8px', color: 'black', width: '300px', marginRight: '16px' }}
            />
            <IconButton type="submit" aria-label="search" style={{ color: 'black' }}>
              <SearchIcon />
            </IconButton>
            <Link to='/checkout'>
              <IconButton color="inherit" style={{ color: 'black' }}>
                <ShoppingCartIcon />
              </IconButton>
            </Link>
            {token ? (
              <div>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  style={{ color: 'black' }}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => navigate('/userinfo')}>User Info</MenuItem>
                  <MenuItem onClick={() => navigate('/orders')}>My Orders</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <Button color="inherit" style={{ color: 'black' }} onClick={() => navigate('/login')}>Login</Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;

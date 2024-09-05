import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const role = token ? JSON.parse(atob(token.split('.')[1])).role : null;

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
      };


  return (
    <AppBar position='static'>
        <Toolbar>
            <Typography variant='h6' component="div" sx={{ flexGrow:1 }}>
                Vortex
            </Typography>
        {token && (
          <>
            {/* <Button color='inherit' component={Link} to='/assets'>
                Inicio
            </Button> */}
            <Button color='inherit' component={Link} to='/assets'>
                Assets
            </Button>
            {role === 'admin' && (
            <Button color='inherit' component={Link} to='/users'>
                Usuarios
            </Button>
            )}
            <Button color="secondary" onClick={handleLogout}>
                        Logout
            </Button>
            </>
        )}
        </Toolbar>
    </AppBar>
    
  );
}

export default Navbar;

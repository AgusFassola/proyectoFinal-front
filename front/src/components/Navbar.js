import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const handleLogout = () => {
        console.log("logout");
      };
  return (
    <AppBar position='static'>
        <Toolbar>
            <Typography variant='h6' component="div" sx={{ flexGrow:1 }}>
                Vortex
            </Typography>
            <Button color='inherit' component={Link} to='/'>
                Inicio
            </Button>
            <Button color='inherit' component={Link} to='/'>
                Assets
            </Button>
            <Button color='inherit' component={Link} to='/users'>
                Usuarios
            </Button>
            <Button color="secondary" onClick={handleLogout}>
                        Logout
            </Button>
        </Toolbar>
    </AppBar>
    
  );
}

export default Navbar;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import "../material/theme";

const Login = () =>{
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post(
                'http://localhost:5000/api/users/login', 
                { email:username, password }
            );

            //guardar el token con localstorage
            localStorage.setItem('token', response.data.token );
            navigate('/assets');
        }catch(error){
            setError('Nombre de usuario o contraseña incorrectos');
            console.log('Error al iniciar sesion: ', error);
        }
    }

    
    return (
        <Container maxWidth="xs" className="login-container">
            <Typography variant="h4" align="center" gutterBottom>
                Iniciar Sesión
            </Typography>

            { error && <Alert severity="error">{error}</Alert> }
            <form onSubmit={handleLogin}>
                <TextField
                        label="Correo electrónico"
                        variant="outlined" 
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                />
                <TextField 
                        label="Contraseña"
                        type='password'
                        variant="outlined"
                        fullWidth
                        margin='normal'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                />
                <Button
                    type='submit'
                    variant="contained"
                    color="primary"
                    fullWidth
                    className='login-button'
                >Iniciar sesión</Button>
            </form>
        </Container>
    )
};



export default Login;
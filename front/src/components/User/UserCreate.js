import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addUser } from '../../reducers/usersSlice';
import { TextField, Button, Container, Typography, Alert, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio  } from '@mui/material';
import "../../material/theme";

const UserCreate = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMessage, setShowMessage] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    

    const handleSubmit =  e => {
        e.preventDefault();

       try{
        dispatch(addUser(formData));
        setShowMessage(true);

            setTimeout(() => {
                setShowMessage(false);
                navigate('/users');
            }, 3000);
       }catch(error){
        alert("error agregando el usuario: "+ error.message);
       }
    };

    return (
        <Container maxWidth="sm" className="create-user-container">
            <Typography variant="h4" align="center" gutterBottom>
                NUEVO USUARIO
            </Typography>
            {showMessage && (
             <Alert severity="success">Usuario agregado exitosamente</Alert>
            )}
            <form onSubmit={handleSubmit}>
                <TextField 
                    label="Nombre de usuario"
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Email"
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Contraseña"
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <FormControl component="fieldset" margin="normal" fullWidth>
                    <FormLabel component="legend">Rol</FormLabel>
                    <RadioGroup
                        style={{ display: 'flex', flexDirection: 'row' }}
                        aria-label="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <FormControlLabel value="user" control={<Radio />} label="User" />
                        <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                    </RadioGroup>
                </FormControl>
                <Button 
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="create-button"
                >Agregar</Button>
                <Link to="/users" className="cancel-button">
                    <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                    >Cancelar</Button>
                </Link> 
            </form>
        </Container>
    );
};

export default UserCreate;

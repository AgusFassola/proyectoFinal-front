import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addAsset } from '../../reducers/assetSlice';
import { Button, TextField, Container, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "./AssetList.css";

const AssetCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        description: '',
        category: '',
        assigned_employee: '',
        assigned_date: ''
    });

    const [showMessage, setShowMessage] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try{
            dispatch(addAsset(formData));
            setShowMessage(true);

            setTimeout(() => {
                setShowMessage(false);
                navigate('/assets');
            }, 3000);
        }catch(error){
            alert("error agregando el asset: "+ error.message);
        }
        
    };

  return (
    <Container maxWidth="sm" className="create-user-container">
        <Typography variant="h4" align="center">NUEVO ASSET</Typography>
        
        {showMessage && (
            <Alert severity="success">Asset agregado exitosamente</Alert>
        )}
        
        <form onSubmit={handleSubmit}>
            <TextField
                label="Descripción"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Categoría"
                name="category"
                value={formData.category}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Empleado Asignado"
                name="assigned_employee"
                value={formData.assigned_employee}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Fecha de Asignación"
                name="assigned_date"
                type="date"
                value={formData.assigned_date}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Box mt={2}>
                <Button type="submit" variant="contained" color="primary">
                    Guardar
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate('/assets')} sx={{ ml: 2 }}>
                    Cancelar
                </Button>
            </Box>
        </form>
    </Container>
  )
}

export default AssetCreate

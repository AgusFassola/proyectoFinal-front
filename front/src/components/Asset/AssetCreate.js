import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addAsset } from '../../reducers/assetSlice';
import { Button, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AssetCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        description: '',
        category: '',
        assigned_employee: '',
        assigned_date: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addAsset(formData));
        alert('Asset agregado exitosamente');
        navigate('/');
    };
  return (
    <Box>
    <Typography variant="h4">Agregar Nuevo Asset</Typography>
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
        />
        <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
                Guardar
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => navigate('/')} sx={{ ml: 2 }}>
                Cancelar
            </Button>
        </Box>
    </form>
</Box>
  )
}

export default AssetCreate

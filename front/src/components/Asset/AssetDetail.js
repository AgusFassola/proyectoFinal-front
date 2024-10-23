import React,{ useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAssetById, updateAsset,clearSelectedAsset } from '../../reducers/assetSlice'
import { Button, TextField, Typography, Box, Alert } from '@mui/material';
import "./AssetList.css";

const AssetDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const asset = useSelector(state => state.assets.selectedAsset );
    const [isEditing, setIsEditing] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({
        description: '',
        category: '',
        assigned_employee: '',
        assigned_date: ''
    });

    useEffect(() => {
        dispatch(fetchAssetById(id)); // Trae el asset al montar
        return () => {
            dispatch(clearSelectedAsset()); // Limpia el asset al desmontar
        };
    }, [dispatch, id]);


    useEffect(() => {
        if (asset) {
            setFormData({
                description: asset.description,
                category: asset.category,
                assigned_employee: asset.assigned_employee,
                assigned_date: new Date(asset.assigned_date).toISOString().split('T')[0]
            });
        } /* else {
            dispatch(fetchAssetById(id));
        } */
    }, [asset]);

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        /* const updatedData = {
            description: formData.description,
            category: formData.category,
            assigned_employee: formData.assigned_employee,
            assigned_date: formData.assigned_date,
        }; */
        const updatedData = { ...formData };
        dispatch(updateAsset({ id, updatedData}));
        setShowMessage(true);
        setIsEditing(false);
            setTimeout(() => {
                setShowMessage(false);
            }, 1500);
    };

    const handleBack = () => navigate('/assets');
    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            description: asset.description,
            category: asset.category,
            assigned_employee: asset.assigned_employee,
            assigned_date: new Date(asset.assigned_date).toISOString().split('T')[0]
        });
    };

    if (!asset) {
        return(
            <Box
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                height="60vh" 
                textAlign="center"
                flexDirection="column"
            >
                <Typography>ASSET NO ENCONTRADO.</Typography>
            </Box>
        ) 
    }

    return (
        <div className='center-container'>
            <div className='table-container'>
            <Typography variant="h4">Detalle de Asset</Typography>
            {showMessage && (
             <Alert severity="success">Asset actualizado</Alert>
            )}
            <TextField
                label="Descripción"
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={!isEditing}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Categoría"
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={!isEditing}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Empleado Asignado"
                name="assigned_employee"
                value={formData.assigned_employee}
                onChange={handleChange}
                disabled={!isEditing}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Fecha de Asignación"
                name="assigned_date"
                type="date"
                value={formData.assigned_date}
                onChange={handleChange}
                disabled={!isEditing}
                fullWidth
                margin="normal"
            />
            <Box mt={2}>
                {isEditing ? (
                    <>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Guardar
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ ml: 2 }}>
                            Cancelar
                        </Button>
                    </>
                ) : ( <>
                    <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
                        Editar
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleBack}>
                        Volver
                    </Button>
                    </>
                )}
                
            </Box>
            </div>
        </div>
    );
};

export default AssetDetail

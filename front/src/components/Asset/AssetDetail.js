import React,{ useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAssetById, updateAsset } from '../../reducers/assetSlice'
import { Button, TextField, Typography, Box } from '@mui/material';
import "./AssetList.css";

const AssetDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const asset = useSelector(state => state.assets.selectedAsset );
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        description: '',
        category: '',
        assigned_employee: '',
        assigned_date: ''
    });

    useEffect(() => {
        if (asset) {
            setFormData({
                description: asset.description,
                category: asset.category,
                assigned_employee: asset.assigned_employee,
                assigned_date: new Date(asset.assigned_date).toISOString().split('T')[0]
            });
        } else {
            dispatch(fetchAssetById(id));
        }
    }, [asset, dispatch, id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        dispatch(updateAsset({ id, ...formData }));
        console.log("modificado:",updateAsset({ id, ...formData }) )
        setIsEditing(false);
        //handleBack();
    };

    const handleBack = () => {
        navigate('/assets');
    }
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
        return <Typography>Asset no encontrado.</Typography>;
    }

    return (
        <div className='center-container'>
            <div className='table-container'>
            <Typography variant="h4">Detalle de Asset</Typography>
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

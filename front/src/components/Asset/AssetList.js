import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchAssets } from '../../reducers/assetSlice';
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper, Button, TablePagination, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
//import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { deleteAsset } from '../../reducers/assetSlice';

const ejemplos = [
    { id: 1, description: 'Laptop', category: 'Electronics', assigned_employee: 'John Doe', assigned_date: '2024-08-01' },
    { id: 2, description: 'Printer', category: 'Electronics', assigned_employee: 'Jane Smith', assigned_date: '2024-08-05' },
    { id: 3, description: 'Desk Chair', category: 'Furniture', assigned_employee: 'Alice Johnson', assigned_date: '2024-08-10' },
    { id: 4, description: 'Office Desk', category: 'Furniture', assigned_employee: 'Bob Brown', assigned_date: '2024-08-15' }
];


const AssetList = () => {
    const [assets, setAssets] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [assetToDelete, setAssetToDelete] = useState(null);
    const dispatch = useDispatch();
    //const { assets, loading, error } = useSelector( state => state.assets);
    const navigate = useNavigate();

    /* useEffect(()=> {
        dispatch(fetchAssets());
    }, [dispatch]); */
    useEffect(() => {
        // Simula una llamada a la API
        setAssets(ejemplos);
    }, []);

    const handleOpenDialog = (asset) => {
        setAssetToDelete(asset);
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setAssetToDelete(null);
    }
    const handleDelete = () => {
        if (assetToDelete) {
            dispatch(deleteAsset(assetToDelete.id));
            setAssets(assets.filter(asset => asset.id !== assetToDelete.id));
            handleCloseDialog();
        }
    };
  
   /*  if( loading ){
        return(
            <div>Loading...</div>
        );
    };
    if( error ){
        return(
            <div>Error: {error}</div>
        );
    }; */
    return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='Asset List'>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Assigned Employee</TableCell>
                    <TableCell>Assigned Date</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {assets.map(asset => (
                    <TableRow 
                        key={asset.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        hover
                        onClick={() => navigate(`/assets/${asset.id}`)}
                    >
                        <TableCell component="th" scope='row'>
                            {asset.id}
                        </TableCell>
                        <TableCell>hola{asset.description}</TableCell>
                        <TableCell>{asset.assigned_employee}</TableCell>
                        <TableCell>{new Date(asset.assigned_date).toLocaleDateString()}</TableCell>
                        <TableCell>
                        <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={(e) => {
                                            e.stopPropagation(); // Evita que el clic en el botón también navegue
                                            navigate(`/assets/${asset.id}`);
                                        }}
                                    >
                                        Details
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        color="error" 
                                        onClick={(e) => {
                                            e.stopPropagation(); // Evita que el clic en el botón también navegue
                                            handleOpenDialog(asset);
                                        }}
                                    >
                                        Delete
                                    </Button>
                        </TableCell>
                    </TableRow>
                ))}
                {assets.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Typography>No hay herramientas disponibles.</Typography>
                                </TableCell>
                            </TableRow>
                        )}
            </TableBody>
        </Table>
    </TableContainer>
  );
};

export default AssetList;
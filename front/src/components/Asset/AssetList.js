import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAssets, deleteAsset } from "../../reducers/assetSlice";
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Dialog, DialogActions, DialogContent, DialogTitle,DialogContentText,

} from "@mui/material";
import { useNavigate } from "react-router-dom";
import './AssetList.css';

const AssetList = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState(null);
  const dispatch = useDispatch();
  const { assets, loading, error } = useSelector((state) => state.assets);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAssets());
  }, [dispatch]);

  const handleOpenDialog = (asset) => {
    setAssetToDelete(asset);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setAssetToDelete(null);
  };
  const handleDelete = () => {
    dispatch(deleteAsset(assetToDelete.id));
    handleCloseDialog();
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className='center-container'>
      
      <div className="table-container">  
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Asset List">
            <TableHead>
              <TableRow>
                <TableCell className="table-head" >Description</TableCell>
                <TableCell className="table-head">Category</TableCell>
                <TableCell className="table-head">Assigned Employee</TableCell>
                <TableCell className="table-head">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assets.map( asset => (
                <TableRow
                  key={asset.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  hover
                  onClick={() => navigate(`/assets/${asset.id}`)}
                >
                  <TableCell component="th" scope="row">
                    {asset.description}
                  </TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell>{asset.assigned_employee}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation(); // Evita que el clic en el botón también navegue
                        navigate(`/assets/${asset.id}`);
                      }}sx={{ mr: 1 }}
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
      </div>
      <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmar Eliminación"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás seguro que deseas eliminar el asset "{assetToDelete?.description}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDelete} color="error" autoFocus>
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
    </div>
  );
};

export default AssetList;

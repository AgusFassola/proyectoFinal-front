import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAssets, deleteAsset } from "../../reducers/assetSlice";
import {
    Table,TableContainer,TableBody,TableCell,TableHead,
    TableRow,Paper,Button,Typography,Dialog,DialogActions,
    DialogContent,DialogTitle,DialogContentText,TextField,
    TableSortLabel,Pagination, Box, CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../material/theme";

const AssetList = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState(null);
  const dispatch = useDispatch();
  const { assets, loading, error, totalPages } = useSelector(
    (state) => state.assets
  );
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch( fetchAssets({ currentPage }));
  }, [dispatch,  currentPage]);

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

  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortField(field);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    dispatch( fetchAssets({currentPage:value }));
  };

  const sortedAssets = [...assets].sort((a, b) => {
    if (sortField) {
      const valueA = a[sortField].toLowerCase();
      const valueB = b[sortField].toLowerCase();
      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    }
    return 0;
  });
  

  const filteredAssets = sortedAssets.filter(asset => {
    return (
        asset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.assigned_employee.toLowerCase().includes(searchTerm.toLowerCase())

    );
});

  const token = localStorage.getItem("token");
  const role = token ? JSON.parse(atob(token.split(".")[1])).role : null;

  if (loading) {
    return (
        <Box
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            height="100vh" 
            textAlign="center"
            flexDirection="column"
        >
            <Typography variant="h5" color="primary">Cargando assets...</Typography>
            <CircularProgress/>
        </Box>
  );
}
  if (error) {
    return <Typography variant="h5" color="error">Error: {error}</Typography>;
  }
  return (
    <div className="center-container">
         <Box  sx={{ display: 'flex',  mb: 3 }}>
            <TextField
                label="Buscar"
                variant="outlined"
                size="small"
                fullWidth={false}
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ width: '300px' }}
            />
            <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/assets/new")}
            >
                Agregar
            </Button>
        </Box>  

      <div className="table-container">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Asset List">
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortField === "description"}
                    direction={
                      sortField === "description" ? sortDirection : "asc"
                    }
                    onClick={() => handleSort("description")}
                  >DESCRIPCION
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === "category"}
                    direction={sortField === "category" ? sortDirection : "asc"}
                    onClick={() => handleSort("category")}
                  >CATEGORIA
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                    <TableSortLabel
                        active={sortField === "assigned_employee"}
                        direction={sortField === "assigned_employee" ? sortDirection : "asc"}
                        onClick={() => handleSort("assigned_employee")}
                    >EMPLEADO ASIGNADO
                    </TableSortLabel>
                </TableCell>
                <TableCell>ACCIONES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAssets.map((asset) => (
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
                      }}
                      sx={{ mr: 1 }}
                    >
                      Detalles
                    </Button>
                    {role === "admin" && (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation(); // Evita que el clic en el botón también navegue
                          handleOpenDialog(asset);
                        }}
                      >
                        Eliminar
                      </Button>
                    )}
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
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ mt: 2 }}
      />
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmar Eliminación"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro que deseas eliminar el asset "
            {assetToDelete?.description}"?
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

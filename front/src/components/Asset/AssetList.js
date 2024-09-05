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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
  TableSortLabel,
  Pagination,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./AssetList.css";

const AssetList = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState(null);
  const dispatch = useDispatch();
  const { assets, loading, error, totalPages, currentPage } = useSelector(
    (state) => state.assets
  );
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchAssets({ description: searchTerm, sortField, sortDirection, page })
    );
  }, [dispatch, searchTerm, sortField, sortDirection, page]);

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
    setPage(value);
  };

  /* const filteredAssets = sortedAssets.filter(asset => {
    return (
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
}); */

  const token = localStorage.getItem("token");
  const role = token ? JSON.parse(atob(token.split(".")[1])).role : null;

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="center-container">
      <div className="search-btn">
        <div item>
          <TextField
            label="Buscar"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/assets/new")}
          >
            Agregar Asset
          </Button>
        </div>
      </div>
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
                  >
                    Description
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === "category"}
                    direction={sortField === "category" ? sortDirection : "asc"}
                    onClick={() => handleSort("category")}
                  >
                    Category
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === "assigned_employee"}
                    direction={
                      sortField === "assigned_employee" ? sortDirection : "asc"
                    }
                    onClick={() => handleSort("assigned_employee")}
                  >
                    Assigned Employee
                  </TableSortLabel>
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assets.map((asset) => (
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
                      Details
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
                        Delete
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

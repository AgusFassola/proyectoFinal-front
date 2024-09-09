import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from '../../reducers/usersSlice';
import { Link } from 'react-router-dom';

import { 
    Box, Typography, Table, TableBody, TableCell, TableContainer, TableSortLabel,
    TableHead, TableRow, Paper, Button, TextField, 
    Pagination , CircularProgress, Dialog,DialogActions,
    DialogContent,DialogTitle,DialogContentText
} from '@mui/material';
import "../../material/theme";

const UserList = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector(state => state.users);
console.log("usuarios:",users)
    const [ sortField, setSortField ] = useState(null);
    const [ sortDirection, setSortDirection ] = useState('asc');
    const [ searchTerm, setSearchTerm ] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages=1;
    useEffect(() => {
        dispatch(fetchUsers({ currentPage }));
    }, [dispatch, currentPage ]);

    const handleOpenDialog = (user) => {
        setUserToDelete(user);
        setOpenDialog(true);
      };
      const handleCloseDialog = () => {
        setOpenDialog(false);
        setUserToDelete(null);
      };
      const handleDelete = () => {
        dispatch(deleteUser(userToDelete.id));
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
        dispatch( fetchUsers({currentPage:value }));
    };
    console.log("llegue?:",users);  
    const filteredUsers = users.filter((user) => {
        console.log("es aca?:",user.username)
        return (
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });
    const sortedUsers = filteredUsers.sort(( a, b ) => {
        if(sortField){       
            const valueA = a[sortField].toLowerCase();
            const valueB = b[sortField].toLowerCase();
            if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
            return 0;
          }
        return 0;
    });


    
    if(loading){
        return(
            <Box 
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                height="100vh" 
                textAlign="center"
                flexDirection="column"
            >
                <Typography variant="h6" mt={2}>
                   Cargando users...
                </Typography>
                <CircularProgress/>
            </Box>
        )
    }

    if(error){
        return <Typography variant="h5" color="error">Error:{error}</Typography>;
    }

    if (!users || users.length === 0) {
        return (
            <Box 
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                height="100vh" 
                textAlign="center"
                flexDirection="column"
            >
                <Typography variant="h6" mt={2}>
                    No hay usuarios disponibles
                </Typography>
            </Box>
        );
    }

    return (
        <Box className="center-container">
            <Box  sx={{ display: 'flex', flexDirection:'row',  mb: 3 }}>
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
                    component={Link} 
                    to="/users/new"
                    sx={{ mb: 2 }}
                >
                    Crear usuario
                </Button>
            </Box>
            <div className="table-container">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={sortField === "username"}
                                    direction={
                                    sortField === "username" ? sortDirection : "asc"
                                    }
                                    onClick={() => handleSort("username")}
                                >NOMBRE
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                            <TableSortLabel
                                    active={sortField === "role"}
                                    direction={
                                    sortField === "role" ? sortDirection : "asc"
                                    }
                                    onClick={() => handleSort("role")}
                                >ROL
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                            <TableSortLabel
                                    active={sortField === "email"}
                                    direction={
                                    sortField === "email" ? sortDirection : "asc"
                                    }
                                    onClick={() => handleSort("email")}
                                >EMAIL
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>ACCIÓN</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained" 
                                        color="error" 
                                        onClick={() => handleOpenDialog(user)}
                                    >
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
            <Box display="flex" justifyContent="center" mt={3}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
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
                        ¿Estás seguro que deseas eliminar el usuario "
                        {userToDelete?.username}"?
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
        </Box>
    );
};

export default UserList;

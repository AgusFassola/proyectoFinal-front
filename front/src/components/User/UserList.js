import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from '../../reducers/usersSlice';
import { Link } from 'react-router-dom';

import ReactPaginate from "react-paginate";

const UserList = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector(state => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDeleteClick = async (id) => {

        if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            dispatch(deleteUser(id));
        }
    };

    //PARA ORDENAR
    const [ sortField, setSortField ] = useState(null);
    const [ sortDirection, setSortDirection ] = useState('asc');

    const handleSort = (field) => {
        const newSortDirection = 
            sortField === field &&
            sortDirection === 'asc' ? 'desc' : 'asc'
        //actualiza el campo y la direccion
        setSortField(field);
        setSortDirection(newSortDirection); 
    };


    //PARA BUSCAR
    const [ searchTerm, setSearchTerm ] = useState('');

       const filteredUsers = users.filter((user) => {
            return (
                user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.role.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
    
    

    //PARA PAGINACION   
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    
    const pageCount =  Math.ceil(filteredUsers.length / usersPerPage);//total de páginas necesarias redondeando para arriba
    const changePage = ({ selected }) => {
        setPageNumber(selected);//actualiza la página seleccionada
    };

    //array nuevo con empleados ordenados
    const sortedUsers = filteredUsers.sort(( a, b ) => {
        if(sortField){        //solo ordena si se especificó un campo para ordenar
            const fieldA = a[sortField];
            const fieldB = b[sortField];
            if( sortDirection === 'asc'){
                return fieldA > fieldB ? 1 : -1;//orden ascendente
            }else{
                return fieldA < fieldB ? 1 : -1;//orden descendente
            }
        }
        return 0;//en caso de no haber campo, no cambia el orden
    });
    
    if(loading){
        return <div className="alert alert-info">Cargando usuarios...</div>;
    }

    if(error){
        return <div className="alert alert-danger">{error}</div>;
    }

    if (users.length === 0) {
        return (
            <div className="alert alert-info">
                No hay usuarios disponibles
            </div>);
    }

    return (
        <div className="primer-div">
            <h2 className="mb-4">Lista de usuarios:</h2>

            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Buscar"
                    className="form-control"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <table className="table table-striped">
                <thead>

                    <tr>
                        <th onClick={() => handleSort('username')}>Nombre</th>
                        <th onClick={() => handleSort('role')}>Rol</th>
                        <th onClick={() => handleSort('email')}>Email</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {/* se crea una copia de una porcion del array
                    devuelve los empleados del 0 al 4 */}
                    {sortedUsers.slice(pagesVisited, pagesVisited + usersPerPage).map(user => (
                        <tr key={user.id}>
                            <td>
                                <Link 
                                    className="user-link"
                                    to={`/users/${user.id}`}>
                                    {user.username}
                                    
                                </Link>
                            </td>
                            <td>
                                <Link
                                    className="user-link"
                                    to={`/users/${user.id}`}>
                                    {user.role}
                                </Link>
                            </td>
                            <td>
                                <Link
                                    className="user-link"
                                    to={`/users/${user.id}`}>
                                    {user.email}
                                </Link>
                            </td>
                            
                            <td>
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => handleDeleteClick(user.id)}
                                    >Eliminar</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Siguiente"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination"}

                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
    );
};

export default UserList;

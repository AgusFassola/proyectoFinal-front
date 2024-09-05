import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addUser } from '../../reducers/usersSlice';

const UserCreate = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    

    const handleSubmit = async e => {
        e.preventDefault();

       try{
        console.log("nuevo usuario:",formData)
        await dispatch(addUser({ ...formData}));
        alert("Usuario agregado correctamente");
        navigate('/login');
        console.log("nuevo empleado:",formData)
       }catch(error){
        alert("error agregando el usuario: "+ error.message);
       }
    };

    return (
        <form className='primer-div' onSubmit={handleSubmit}>
            <h2>Nuevo usuario</h2>
            <div className='form-group'>
                <label>Nombre de Usuario:</label>
                <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Usuario" required
                />
            </div>

            <div>
                <label>Email:</label>
                <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email" required
                />
            </div>

            <div>
                <label>Contraseña:</label>
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Contraseña" required
                />
            </div>
            <div>
                <label>Rol:</label>
                <input
                    type="text"
                    className="form-control"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="Rol" 
                />
            </div>
            <button className='btn btn-primary' type="submit">Agregar</button>
            
            <Link 
                to="/users" className="btn btn-danger mb-3"
            >Cancelar</Link> 
        </form>
    );
};

export default UserCreate;

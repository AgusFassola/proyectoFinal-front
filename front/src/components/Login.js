import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () =>{
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post(
                'http://localhost:5000/api/users/login', 
                { email:username, password }
            );

            //guardar el token con localstorage
            localStorage.setItem('token', response.data.token );
            navigate('/assets');
        }catch(error){
            setError('Nombre de usuario o contraseña incorrectos');
            console.log('Error al iniciar sesion: ', error);
        }
    }

    
    return (
        <div className='container'>
            <h2>Iniciar Sesión</h2>
            { error && <div className='alert alert-danger'>{error}</div> }
            <form onSubmit={handleLogin}>
                <div className='mb-3'>
                    <label 
                        htmlFor='username' 
                        className='form-label'
                    >Correo electrónico</label>
                    <input 
                        type='text'
                        className='form-control'
                        id='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label
                        htmlFor='password'
                        className='form-label'
                    >Contraseña</label>
                    <input
                        type='password'
                        className='form-control'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type='submit'
                    className='btn btn-primary'
                >Iniciar sesión</button>
            </form>
            <Link to="/users/new"
            >Crear nuevo usuario</Link>
        </div>
    )
};



export default Login;
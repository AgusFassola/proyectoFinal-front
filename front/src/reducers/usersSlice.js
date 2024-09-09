import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Obtener los usuarios del backend
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:5000/api/users');
  return response.data.users;
});

//Agregar un usuario 
export const addUser = createAsyncThunk('users/addUser', async (user) => {
  console.log("addUser:",user)
  const response = await axios.post('http://localhost:5000/api/users/create', user);
  return response.data.user;
});

//Eliminar un usuario 
export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await axios.delete(`http://localhost:5000/api/users/${id}`);
  return id;
});

const initialState = {
  users: [],
  selectedUser: null,
  loading: false,
  error:null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        //handle fetchusers
        .addCase(fetchUsers.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
          state.loading = false;
          state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        //handle adduser
        .addCase(addUser.fulfilled, (state, action) => {
          state.users.push(action.payload);
        })

        //handle deleteuser
        .addCase(deleteUser.fulfilled, (state, action) => {
          state.users = state.users.filter(user => user.id !== action.payload);
        })
  },
});

export default userSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks para interactuar con la API
export const fetchAssets = createAsyncThunk('assets/fetchAssets', async () => {
    const response = await axios.get('http://localhost:5000/api/assets');
    return response.data.assets;
});


export const fetchAssetById = createAsyncThunk('assets/fetchAssetById', async (id) => {
    const response = await axios.get(`http://localhost:5000/api/assets/${id}`);
    return response.data.asset;
  });

export const addAsset = createAsyncThunk('assets/addAsset', async (asset) => {
    const response = await axios.post('http://localhost:5000/api/assets', asset);
    return response.data.asset;
});

export const updateAsset = createAsyncThunk('assets/updateAsset', async ({ id, updatedData }) => {
    const response = await axios.patch(`http://localhost:5000/api/assets/${id}`, updatedData);
    return response.data.asset;
});

export const deleteAsset = createAsyncThunk('assets/deleteAsset', async (id) => {
    await axios.delete(`http://localhost:5000/api/assets/${id}`);
    return id;
});

// Estado inicial
const initialState = {
    assets: [],
    loading: false,
    error: null,
};

// Crear el slice
const assetSlice = createSlice({
    name: 'assets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssets.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAssets.fulfilled, (state, action) => {
                state.loading = false;
                state.assets = action.payload;
            })
            .addCase(fetchAssets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //handle fetchAssetById
            .addCase(fetchAssetById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAssetById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedAsset = action.payload;
            })
            .addCase(fetchAssetById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })    
            .addCase(addAsset.fulfilled, (state, action) => {
                state.assets.push(action.payload);
            })
            .addCase(updateAsset.fulfilled, (state, action) => {
                const index = state.assets.findIndex(asset => asset.id === action.payload.id);
                if (index !== -1) {
                    state.assets[index] = action.payload;
                }
            })
            .addCase(deleteAsset.fulfilled, (state, action) => {
                state.assets = state.assets.filter(asset => asset.id !== action.payload);
            });
    },
});

export default assetSlice.reducer;

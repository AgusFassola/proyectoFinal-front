import { configureStore } from '@reduxjs/toolkit';
import assetSlice from '../reducers/assetSlice';

const store = configureStore({
  reducer: {
    assets: assetSlice
  }
});

export default store;

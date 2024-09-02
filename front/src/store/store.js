import { configureStore } from '@reduxjs/toolkit';
import assetSlice from '../reducers/assetSlice';

const store = configureStore({
  reducer: {
    asset: assetSlice
  }
});

export default store;

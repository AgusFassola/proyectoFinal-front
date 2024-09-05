import { configureStore } from '@reduxjs/toolkit';
import assetSlice from '../reducers/assetSlice';
import usersSlice from '../reducers/usersSlice';

const store = configureStore({
  reducer: {
    assets: assetSlice,
    users: usersSlice
  }
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import walletSlice from 'features/walletSlice';

export default configureStore({
  reducer: {
    walletInfo: walletSlice,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import amountReducer from './amountSlice';
import dataReducer from './dataSlice';

const store = configureStore({
  reducer: {
    amount: amountReducer,
    data: dataReducer,
  },
});

export default store;
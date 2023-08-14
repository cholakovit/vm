import { configureStore } from '@reduxjs/toolkit';
import amountReducer from './amountSlice';
import dataReducer from './dataSlice';
import { apiSlice } from './apiSlice';

const store = configureStore({
  reducer: {
    amount: amountReducer,
    data: dataReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
});

export default store;
import { configureStore } from '@reduxjs/toolkit';
import amountReducer from './amountSlice';
import dataReducer from './dataSlice';

const store = configureStore({
  reducer: {
    amount: amountReducer,
    data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
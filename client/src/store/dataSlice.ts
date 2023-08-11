import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//import data from '../data/db.json';
import { FIALED, IDLE, LOADING, SUCCESS } from '../constants/common';

// Types
import { InitialState } from './store.types';
import { RootState } from './store';


const initialState: InitialState = {
  items: [],
  status: IDLE, //'idle' | 'loading' | 'succeeded' | 'failed'
  allItemsStatus: IDLE, //'idle' | 'loading' | 'succeeded' | 'failed'
  itemsError: ""
}

export const selectItems = createAsyncThunk('items/items', async () => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL
    if (apiUrl) {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } 
  } catch (error) {
    throw error;
  }
})

const dataSlice = createSlice({
  name: 'data',
  //initialState: data.items, // Set the initial state from the db.json file
  initialState: initialState, // Set the initial state from the GO API file
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(selectItems.pending, (state) => {
        state.status = LOADING
    })
    .addCase(selectItems.fulfilled, (state, action: PayloadAction) => {
        state.items = action.payload
        state.status = SUCCESS
    })
    .addCase(selectItems.rejected, (state, action: any) => {
        state.status = FIALED
        state.itemsError = action.error.message
    })
  }
});

export const getStatus = (state: RootState) => state.data.status
export const getItems = (state: RootState) => state.data.items
export const getItemsError = (state: RootState) => state.data.itemsError

export default dataSlice.reducer;


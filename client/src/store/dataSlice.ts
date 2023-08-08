// dataSlice.js
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//import data from '../data/db.json';
import { FIALED, IDLE, LOADING, SUCCESS } from '../constants/common';
import { InitialState } from '../types';

const initialState: InitialState = {
  items: [],
  status: IDLE, //'idle' | 'loading' | 'succeeded' | 'failed'
  allItemsStatus: IDLE, //'idle' | 'loading' | 'succeeded' | 'failed'
  allItemsError: null,
  itemsError: null
}

export const selectItems = createAsyncThunk('items/items', async () => {
  try {
    const response = await axios.get('http://localhost:3000/items');
    return response.data;
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
        state.allItemsError = action.error.message
    })
  }
});

export const getStatus = (state: any) => state.data.status
export const getItems = (state: any) => state.data.items
export const getItemsError = (state: any) => state.data.itemsError
export const getFilteredItems = (state: any) => state.data.filtered

export const getFilteredItemsMsg = (state: any) => state.data.filteredMsg

export default dataSlice.reducer;


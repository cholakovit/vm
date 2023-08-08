// dataSlice.js
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import data from '../data/db.json';
import { FIALED, IDLE, LOADING, SUCCESS } from '../constants/common';

type Item = {
  name: string
  price: number
  number: number
}

type InitialState = {
  items: Item[] | void,
  status: String
  allItemsStatus: String
  allItemsError: string | null
  itemsError: string | null
}

const initialState: InitialState = {
  items: [],
  status: IDLE, //'idle' | 'loading' | 'succeeded' | 'failed'
  allItemsStatus: IDLE, //'idle' | 'loading' | 'succeeded' | 'failed'
  allItemsError: null,
  itemsError: null
}


export const selectItems = createAsyncThunk('items/items', async () => {
  console.log("createAsyncThunk selectItems")
  try {
    const response = await axios.get('http://localhost:3000/items');
    console.log("selectItems response: ", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
})

const dataSlice = createSlice({
  name: 'data',
  //initialState: data.items, // Set the initial state from the db.json file
  initialState: initialState, // Set the initial state from the db.json file
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(selectItems.pending, (state) => {
      console.log('PENDING')
        state.status = LOADING
    })
    .addCase(selectItems.fulfilled, (state, action: PayloadAction) => {
      console.log('SUCCESS')
        state.items = action.payload
        state.status = SUCCESS
    })
    .addCase(selectItems.rejected, (state, action: any) => {
      console.log('FIALED')
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


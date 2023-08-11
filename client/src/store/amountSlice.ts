import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// Interface
import { AmountState } from './store.types';

// Constants
import { ADD_MORE_FUNDS, AMOUNT_SLICE } from '../constants/common';

const amountSlice = createSlice({
  name: AMOUNT_SLICE,
  initialState: { value: 0, flag: 0, errorMessage: "" } as AmountState, // Set the initial state with the correct structure
  reducers: {
    setAmount: (state, action: PayloadAction<number>) => {
      return {
        value: (state.value + action.payload),
        flag: 0,
        errorMessage: "",
      };
    },
    subtractPrice: (state, action: PayloadAction<number>) => {
      const itemPrice = action.payload;
      if (state.value < itemPrice) {
        return {
          ...state,
          errorMessage: ADD_MORE_FUNDS,
        };
      }

      return {
        value: (state.value - itemPrice),
        flag: 1,
        errorMessage: "",
      };
    },
  }
})

export const { setAmount, subtractPrice } = amountSlice.actions
export default amountSlice.reducer;
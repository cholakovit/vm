import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// Define the state type
interface AmountState {
  value: number;
  flag: number;
  errorMessage: string; // New property to store the error message
}

const amountSlice = createSlice({
  name: 'amount',
  initialState: { value: 0, flag: 0, errorMessage: "" } as AmountState, // Set the initial state with the correct structure
  reducers: {
    setAmount: (state, action: PayloadAction<number>) => {
      return {
        value: action.payload,
        flag: 0,
        errorMessage: "",
      };
    },
    subtractPrice: (state, action: PayloadAction<number>) => {
      const itemPrice = action.payload;
      if (state.value < itemPrice) {
        return {
          ...state,
          errorMessage: "Insufficient balance. Please add more funds.",
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
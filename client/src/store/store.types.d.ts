import store from "./store";

// Define the state type
interface AmountState {
  value: number;
  flag: number;
  errorMessage: string; // New property to store the error message
}

interface InitialState {
  items: any,
  status: string
  allItemsStatus: string
  itemsError: string
}

// Define the custom store interface
interface AppStore {
  dispatch: typeof store.dispatch;
  getState: typeof store.getState;
}

// Define the RootState type representing the entire Redux state tree
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
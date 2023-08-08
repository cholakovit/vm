

import { AlertColor } from "@mui/material";

interface ColorModeContextValue {}

// Define a custom palette interface
interface CustomPalette {
  primary: {
    main: string;
    black: string;
    white: string;
    iconColor: string;
  };
  mode: PaletteMode;
}

// Define the RootState type representing the entire Redux state tree
export type RootState = ReturnType<typeof store.getState>;

// Define the custom store interface
export interface AppStore {
  dispatch: typeof store.dispatch;
  getState: typeof store.getState;
}

export interface ColorModeContextType {
  toggleColorMode: () => void;
}

export type ItemsProps = {
  item: {
    name: string;
    price: number;
    number: number;
  },
  //key: number;
  id: number;
}

export type ItemProps = {
  name: string;
  price: number;
  number: number;
}

// for the Theme
export type colorModeProps = {
  toggleColorMode?: any;
};

// for Errors
export type errorProps = {
  error: string;
};

// for the Skeleton
export type SkeletonProps = {
  flag: number;
  width: number;
  height: number;
};

// For the Providers
export type ProvidersProps = {
  provider: ProviderProps
}

// For the Provider
export type ProviderProps = {
  provider: number
  day: number
  year: number
  page: string
  views: number
}

export type AlertProps = {
  alert: string | null
  type: any
}
import { PaletteOptions, Theme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteColor {
    lighter?: string;
    light: string;
    main: string;
    dark: string;
    contrastText: string;
    black?: string;
    fourth?: string; 
    white?: string;
  }

  interface Palette {
    primary: PaletteColor;
  }

  // Merge the Palette interface with the Theme interface
  interface Theme extends Palette {
    breakpoints: {
      values: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
      };
      up: (key: number | string) => string;
      down: (key: number | string) => string;
      between: (start: number | string, end: number | string) => string;
      only: (key: number | string) => string;
      width: (key: number | string) => number;
    };
  }

  // Add any other customizations or extensions to the ThemeOptions interface if needed
  interface ThemeOptions {
    palette?: PaletteOptions;
    // Add theme options here, if any
  }
}

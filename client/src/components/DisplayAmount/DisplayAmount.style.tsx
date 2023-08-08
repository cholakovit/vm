import { styled } from "@mui/material/styles";
import { Box } from '@mui/material';


export const DisplayAmountHolder = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  width: '100px',
  [theme.breakpoints.down('sm')]: {}
}));

export const AmountHolder = styled(Box)(({ theme }) => ({
  //border: "1px solid green",
  [theme.breakpoints.down('sm')]: {}
}));

export const ChangeHolder = styled(Box)(({ theme }) => ({
  //border: "1px solid yellow",
  [theme.breakpoints.down('sm')]: {}
}));
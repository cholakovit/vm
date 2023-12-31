import { styled } from "@mui/material/styles";
import { Box } from '@mui/material';

export const DisplayAmountHolder = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  width: '100%',
  margin: "",
  padding: "0px 5px",
  [theme.breakpoints.down('sm')]: {}
}));

export const AmountHolder = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.black,
  [theme.breakpoints.down('sm')]: {}
}));

export const ChangeHolder = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.black,
  [theme.breakpoints.down('sm')]: {}
}));

export const ErrorMessage = styled(Box)(({ theme }) => ({
  fontSize: "14px",
  [theme.breakpoints.down('sm')]: {}
}));
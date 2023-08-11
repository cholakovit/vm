// Styled Elements
import { styled } from '@mui/material/styles';

// MUI Elements
import { Box, Button } from "@mui/material";

export const VendingButtonsHolder = styled(Box)(({ theme }) => ({
  margin: "0 5px"
}));

export const DisplayItemNumber = styled(Box)(({ theme }) => ({
  margin: "0 20px",
  height: "60px",
  width: "85%",
}));

export const DisplayNumberItemTitle = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.white,
  fontSize: "10px",
}));

export const DisplayedConcatenatedNumber = styled(Box)(({ theme }) => ({
  width: "100%",
  textAlign: "center",
  color: theme.palette.primary.white,
  display: "block",
  fontSize: "20px",
  padding: "5px",
  height: "40px"
}));

export const ButtonSection = styled(Box)({
  textAlign: "center",
  padding: "3px"
});

export const ButtonHolder = styled(Button)(({ theme }) => ({
  margin: '3px',
  width: "5px",
  padding: "5px",
  color: theme.palette.primary.white,
  border: "1px solid " + theme.palette.primary.white,
}));

export const ErrorMessage = styled(Button)({
  width: "100%",
  padding: "5px"
});
// Styled Elements
import { styled } from '@mui/material/styles';

// MUI Elements
import { Box, Button, Container } from '@mui/material';

export const FormHolder = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: 'flex',
    padding: "10px"
  },
}));

export const FieldHolder = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    order: 1
  },
}));

export const ButtonHolder = styled(Button)(({ theme }) => ({
  alignItems: 'center', 
  margin: "10px 0 0 0",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    justifyContent: 'center',
    width: "100%",
    marginTop: "20px",
    order: 2
  },
}));

export const DisplayTitle = styled(Box)(({ theme }) => ({
  margin: "5px 0 0 0",
  fontSize: "10px",
  color: theme.palette.primary.white,
  [theme.breakpoints.down("sm")]: {

  },
}));

export const DisplayHolder = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.white,
  margin: "5px 0 0 0",
  height: "50px",
  [theme.breakpoints.down("sm")]: {

  },
}));

export const AmountHolder = styled(Box)(({ theme }) => ({
  flex: 1,
  justifyContent: 'flex-start',
  [theme.breakpoints.down("sm")]: {
    display: "block",
    width: "180px",
    padding: "30px",
    order: 3
  },
}));
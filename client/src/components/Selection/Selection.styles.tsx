// Styled Elements
import { styled } from '@mui/material/styles';

// MUI Elements
import { Box, Container } from '@mui/material';

export const FormHolder = styled(Container)(({ theme }) => ({

  [theme.breakpoints.down("sm")]: {
    display: 'flex',
    padding: "10px"
  },
}));

export const FieldHolder = styled(Box)(({ theme }) => ({
  margin: '10px',
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    order: 1
  },
}));

export const ButtonHolder = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center', 
  marginRight: "10px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    justifyContent: 'center',
    width: "100%",
    marginTop: "20px",
    order: 2
  },
}));

export const AmountHolder = styled(Box)(({ theme }) => ({
  flex: 1,
  justifyContent: 'flex-start',
  marginLeft: '10px',
  [theme.breakpoints.down("sm")]: {
    display: "block",
    width: "180px",
    padding: "30px",
    order: 3
  },
}));
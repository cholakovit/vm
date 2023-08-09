// Styled Elements
import { styled } from '@mui/material/styles';

// MUI Elements
import { Container, Box, Typography } from '@mui/material';

export const Title = styled(Typography)({
  fontSize: '22px',
  padding: '10px 0'
});

export const ItemContainer = styled(Container)(({ theme }) => ({
  marginTop: '100px',
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'flex-start',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  }
}));

export const SelectionHolder = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  width: '20%',
  border: '1px solid white',
  minHeight: "500px",
  padding: "10px 0px",
  backgroundColor: theme.palette.primary.black,
  [theme.breakpoints.between('md', 'lg')]: {
    width: '25%', // Around 30% width for tablets

  },
  [theme.breakpoints.between('sm', 'md')]: {
    width: '30%', // Around 30% width for tablets
    minWidth: '30%',

  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    order: 1,
    marginBottom: '10px',
    padding: '10px',
    height: '400px'
  }
}));

export const ItemsHolder = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  width: '80%', 
  [theme.breakpoints.between('md', 'lg')]: {
    width: '75%', // Around 30% width for tablets
  },
  [theme.breakpoints.between('sm', 'md')]: {
    width: '70%', // Around 30% width for tablets
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%', // Set the width back to 80% for larger screens (sm and above)
    order: 2
  }
}));

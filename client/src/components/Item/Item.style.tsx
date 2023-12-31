// MUI Elements
import Box from '@mui/material/Box';

// Styled Elements
import { styled } from '@mui/material/styles';

export const ItemHolder = styled(Box)(({ theme }) => ({
  padding: '10px',
  marginBottom: '20px',
  display: 'flex',
  backgroundColor: theme.palette.primary.black,
  width: '14%',
  border: '1px solid' + theme.palette.primary.white,
  marginRight: '20px',
  overflow: 'hidden',
  maxHeight: '120px',
  [theme.breakpoints.down('sm')]: {
    width: '28%' // Set the width to 30% for smaller screens (down to sm breakpoint)
  },
  [theme.breakpoints.between('sm', 'md')]: {
    width: '28%' // Around 30% width for tablets
  },
  [theme.breakpoints.between('md', 'lg')]: {
    width: '21%' // Set the width to 25% for tablets (between md and lg breakpoints)
  }
}));

export const Content = styled(Box)({
  width: '100%',
  overflow: 'hidden'
});

export const PriceHolder = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.white
}));

export const NameHolder = styled(Box)({
  height: '50px',
  overflow: 'hidden'
});

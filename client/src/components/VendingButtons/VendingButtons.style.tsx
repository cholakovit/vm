import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";


export const ButtonHolder = styled(Button)({
  margin: '3px',
});

export const ButtonSection = styled(Box)({
  textAlign: "center",
  display: "block",
  marginTop: "-50px"
});

export const DisplayedConcatenatedNumber = styled(Box)(({ theme }) => ({
  width: "100%",
  textAlign: "center",
  //color: theme.palette.primary.white,
  color: "white",
  display: "block",
  fontSize: "20px",
  padding: "5px",
  height: "40px"
}));
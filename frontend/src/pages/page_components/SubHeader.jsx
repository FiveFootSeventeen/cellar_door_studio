import React from "react";

import Grid from "@mui/material/Grid";

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Subtitle = styled(Typography)(({ theme }) => ({
    color: "white",
    fontFamily: 'Active',
    display: "inline",
    [theme.breakpoints.up('xs')]: {
      fontSize: "3.2rem",
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: "4rem",
    },
    [theme.breakpoints.up('md')]: {
      fontSize: "4rem",
    },
  }));


const SubHeader = (props) => {

  return (
    <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
            marginTop: "2rem",
            marginBottom: "2rem",
            paddingLeft: "8rem",
            width: "100%"
        }}
    >
        <Grid item xs={2}>
            <Subtitle>
                {props.name}
            </Subtitle>
        </Grid>
        <Grid item xs={10}>
            {props.children}
        </Grid>
    </Grid>
  )
}

export default SubHeader;
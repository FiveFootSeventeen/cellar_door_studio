import React from "react";

import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import CDSLogo from '../static/images/cellar_door_stamp_sil_2.webp';

const Title = styled(Typography)(({ theme }) => ({
    color: "white",
    marginTop: "2rem",
    marginBottom: "2rem",
    fontFamily: 'Active',
    lineHeight: '2rem !important',
    fontWeight: 'bold',
    [theme.breakpoints.up('xs')]: {
      fontSize: "3rem",
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: "5rem",
    },
    [theme.breakpoints.up('md')]: {
      fontSize: "5rem",
    },
  }));


const Logo = () => {

  return (
    <React.Fragment>
        <CardMedia
          component="img"
          image={CDSLogo}
          sx={{
            marginTop: "2rem",
            width: "10rem"
          }}
          alt="Loyalty Picture"
        />
        <Title>Cellar Door Studio</Title>
    </React.Fragment>
  )
}


export default Logo;
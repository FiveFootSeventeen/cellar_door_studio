import { useState, useEffect} from "react";
import React from "react";

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Spacer = styled(Typography)(({ scale, theme }) => ({
  marginTop: "1rem",
  marginBottom: "1rem",
  fontFamily: 'Active',
  lineHeight: '2rem !important',
  [theme.breakpoints.up('xs')]: {
    fontSize: `${1.2 * scale}rem`,
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: `${1.5 * scale}rem`,
  },
  [theme.breakpoints.up('md')]: {
    fontSize: `${1.7 * scale}rem`,
  },
}));

const BootstrapButton = styled(Button)(({ scale, theme }) => ({
  color: "white",
  boxShadow: 'none',
  textTransform: 'none',
  borderRadius: 0,
  textDecoration: 'none',
  [theme.breakpoints.up('xs')]: {
    fontSize: `${1 * scale}rem`,
    marginLeft: '.25rem',
    marginRight: '.25rem',
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: `${1.2 * scale}rem`,
    marginLeft: '1rem',
    marginRight: '1rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: `${1.5 * scale}rem`,
    marginLeft: '1rem',
    marginRight: '1rem',
  },
  fontFamily: [
    'Active',
  ].join(','),
  '&:visited': {
    color: "white",
    textDecoration: 'none',
  },
  '&:link': {
    color: "white",
    textDecoration: 'none',
  },
  '&:hover': {
    color: "white",
    textShadow: "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white",
    boxShadow: 'none',
    textDecoration: 'none',
    borderRadius: 0,
  },
  '&:active': {
    color: "white",
    boxShadow: 'none',
    textDecoration: 'none',
    borderRadius: 0,
  },
}));

const NavBar = (props) => {
  const [buttonLst, setButtonLst] = useState([]);

  useEffect(() => {
    setButtonLst(props.links.filter((link) => !link.hidden).map((link) =>
        <React.Fragment
          key={link.href}
        >
          <BootstrapButton 
            target={link.target_blank ? "_blank" : ""} href={link.href}
            scale={props.scale ? props.scale : 1}
          >
            {link.name}
          </BootstrapButton>
          { link.spacer &&
            <Spacer
              scale={props.scale ? props.scale : 1}
            >
              |
            </Spacer>
          }
        </React.Fragment>
      )
    )
  }, [props.scale, props.links])

  return (
    <AppBar
      className="Center-content"
      position="static"
    >
      <Toolbar >
        {buttonLst}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar;

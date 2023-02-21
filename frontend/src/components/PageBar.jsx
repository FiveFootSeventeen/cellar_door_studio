import { useState, useEffect} from "react";
import React from "react";

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Spacer = styled(Typography)(({ scale, theme }) => ({
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

const BootstrapButton = styled(Button)(({ textDecoration, fontWeight, scale, theme }) => ({
  color: "white",
  boxShadow: 'none',
  borderRadius: 0,
  fontWeight: fontWeight,
  textDecoration: textDecoration,
  textUnderlineOffset: ".5rem",
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
    textDecoration: textDecoration,
    textUnderlineOffset: ".5rem"
  },
  '&:link': {
    color: "white",
    textDecoration: textDecoration,
    textUnderlineOffset: ".5rem"
  },
  '&:hover': {
    color: "white",
    textShadow: "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white",
    boxShadow: 'none',
    borderRadius: 0,
    textDecoration: textDecoration,
    textUnderlineOffset: ".5rem"
  },
  '&:active': {
    color: "white",
    boxShadow: 'none',
    borderRadius: 0,
    textDecoration: textDecoration,
    textUnderlineOffset: "1rem"
  },
}));

const PageBar = (props) => {
  const [buttonLst, setButtonLst] = useState([]);

  useEffect(() => {
    setButtonLst(props.tabLst.map((tab) =>
        <React.Fragment
          key={tab.num}
        >
          <BootstrapButton 
            textDecoration={props.currTab === tab.num ? 'underline' : ''}
            fontWeight={props.currTab === tab.num ? "1000" : ""}
            scale={props.scale ? props.scale : 1}
            onClick={() => props.setCurrTab(tab.num)}
          >
            {tab.name}
          </BootstrapButton>
          { tab.spacer &&
            <Spacer
              scale={props.scale ? props.scale : 1}
            >
              |
            </Spacer>
          }
        </React.Fragment>
      )
    )
  }, [props, props.scale, props.tabLst])

  return (
    <AppBar
      className="Center-content"
      position="static"
      sx={{
          marginTop: "3rem",
          display: "inline"
      }}
    >
      <Toolbar >
        {buttonLst}
      </Toolbar>
    </AppBar>
  )
}

export default PageBar;

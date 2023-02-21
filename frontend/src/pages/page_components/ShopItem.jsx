import React from "react";
import { useState, useEffect } from "react";

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styled from '@mui/material/styles/styled';
import { Box } from "@mui/material";

import CrossfadeImage from "react-crossfade-image";


const BootstrapCard = styled(Card)(({ theme }) => ({
    borderColor: "black",
    color: "black",
    zIndex: 1,
    textTransform: 'none',
    borderRadius: 0,
    height: "35rem",
    [theme.breakpoints.up('xs')]: {
        fontSize: `1rem`,
        marginLeft: '.25rem',
        marginRight: '.25rem',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: `1.2rem`,
        marginLeft: '1rem',
        marginRight: '1rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: `1.5rem`,
        marginLeft: '1rem',
        marginRight: '1rem',
    },
    fontFamily: [
        'Merriweather',
    ].join(','),
        '&:visited': {
        color: "black",
    },
    '&:link': {
        color: "black",
    },
    '&:hover': {
        color: "black",
        textShadow: "-.3px 0 black, 0 .3px black, .3px 0 black, 0 -.3px black",
        boxShadow: 'none',
    },
    '&:active': {
        color: "black",
        boxShadow: 'none',
    },
    '.MuiCardContent-root': {
        backgroundColor: "black"
    }
}));


export default function ShopItem(props) {
  const [glazeDescriptions, setGlazeDescriptions] = useState([]);
  const [itemImg, setItemImg] = useState(props.mainImg);

  const soldComponent = 
        <Box
            sx={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                zIndex: 2,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Typography 
                variant="h2" 
                component="div"
                sx={{
                    fontFamily: "active"
                }}
            >
                Sold 
            </Typography>
        </Box>

  useEffect(() => {
    setGlazeDescriptions(props.glazeDescription.map((desc) =>
        <Typography variant="body2" color="black">
            {desc}
        </Typography>
      )
    )
  }, [props.glazeDescription])

  return (
    <Button
        onMouseOver={() => {
            setItemImg(props.altImg);
        }}
        onMouseLeave={() => {
            setItemImg(props.mainImg);
        }}
        sx={{
            margin: ".75rem",
            paddingTop: "1.5rem"
        }}
        href={`/shop/item/${props.productId}`}

    >
        { props.sold &&
            soldComponent
        }
        <BootstrapCard 
            sx={{
                backgroundColor: "black",
            }}
        >
            <CardMedia
                sx={{
                    backgroundColor: "black",
                }}
            >
                <CrossfadeImage
                    src={itemImg}
                    duration={700}
                    timingFunction="steps(75, jump-none)"
                    style={{
                        width: "20rem",
                        height: "25rem",
                        objectFit: "cover",
                        objectPosition: "50% 50%",
                        borderRadius: "4px",
                    }}
                />
            </CardMedia>
            <CardContent
                style={{
                    backgroundColor: "#bfbfbf",
                    borderRadius: "4px",
                }}
            >
                <Typography gutterBottom variant="h5" component="div">
                    {props.name}
                </Typography>
                <Typography variant="body2" color="black">
                    {glazeDescriptions}
                </Typography>
            </CardContent>
        </BootstrapCard>
    </Button>
  );
}
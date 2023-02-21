import React from "react";
import { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";

import PageBar from "../components/PageBar";
import ShopItem from "./page_components/ShopItem";
import SubHeader from "./page_components/SubHeader";

import bowl1 from "../static/test/test_1.png"
import bowl2 from "../static/test/test_2.png"
import bowl3 from "../static/test/test_5.png"
import bowl4 from "../static/test/test_6.png"
import bowl5 from "../static/test/test_9.png"
import plate1 from "../static/test/test_3.png"
import plate2 from "../static/test/test_4.png"
import plate3 from "../static/test/test_10.png"
import cup1 from "../static/test/test_7.png"
import cup2 from "../static/test/test_8.png"


export default function Shop(props) {
  const [currTab, setCurrTab] = useState(0);
  const [shopItemLst, setShopItemLst] = useState([]);

  const potteryJson = [
    { 
        "name": "Covered Bowl",
        "artist": "Jacob Leno",
        "type": "bowl",
        "main_img": bowl1,
        "alt_img": bowl2,
        "product_id": "A12D39",
        "sold": false,
        "price": 75.5,
        "description": "Covered bowl with Aspen branch porcelain inlay. An excellent bowl for storing and reheating leftovers.\n\nElectric Fired. Microwave and dishwasher safe.",
        "glaze_description": ["Porcelain Slip", "Shino Glaze"],
        "info": [
            {
                "name": "Lid",
                "height_in": 3.5,
                "diameter": 5.5,
                "weight_oz": 4.5
            },
            {
                "name": "Bowl",
                "height_in": 6.2,
                "diameter": 6.5,
                "weight_oz": 7.23
            }
        ]
    },
    { 
        "name": "Small Bowl",
        "artist": "Jacob Leno",
        "type": "bowl",
        "main_img": bowl3,
        "alt_img": bowl4,
        "extra_img_lst": [bowl5],
        "product_id": "B73924",
        "price": 25,
        "sold": true,
        "description": "Small bowl. The perfect size for snacks and sides.\n\nElectric Fired. Microwave and dishwasher safe.",
        "glaze_description": ["Porcelain Slip", "Shino Glaze"],
        "info": [
            {
                "name": "Bowl",
                "height_in": 2.5,
                "diameter": 4.2,
                "weight_oz": 3.5
            }
        ]
    },
    { 
        "name": "Small Plate",
        "artist": "Jacob Leno",
        "type": ["plate", "teaware"],
        "main_img": plate1,
        "alt_img": plate2,
        "extra_img_lst": [plate3],
        "product_id": "CC327A",
        "price": 20.75,
        "sold": false,
        "description": "Small Plate. The perfect size for snacks and sides.\n\nElectric Fired. Microwave and dishwasher safe.",
        "glaze_description": ["Porcelain Slip.", "Shino Glaze."],
        "info": [
            {
                "name": "Small Plate",
                "height_in": 1.25,
                "diameter": 3.5,
                "weight_oz": 2
            }
        ]
    },
    { 
        "name": "Wedding Cup",
        "artist": "Jacob Leno",
        "type": ["cup", "teaware"],
        "main_img": cup1,
        "alt_img": cup2,
        "product_id": "BAB97C",
        "price": 20,
        "sold": false,
        "description": "Wedding Cup. Holds approximately 6oz.\n\nElectric Fired. Microwave and dishwasher safe.",
        "glaze_description": ["Green Glaze"],
        "info": [
            {
                "name": "Small Plate",
                "height_in": 3.2,
                "diameter": 3,
                "weight_oz": 3.67
            }
        ]
    }
  ]

  const potteryTabs = [
    { "name": "All", "num": 0, "filter_name": "all", "spacer": true },
    { "name": "Bowls", "num": 1, "filter_name": "bowl", "spacer": true },
    { "name": "Cups", "num": 2, "filter_name": "cup", "spacer": true },
    { "name": "Plates", "num": 3, "filter_name": "plate", "spacer": true },
    { "name": "Tea Wares", "num": 4, "filter_name": "tea_ware" },
  ];

  useEffect(() => {
    console.log(potteryTabs[currTab]["filter_name"]);
  }, [currTab])

  useEffect(() => {
    setShopItemLst(potteryJson.map((item) =>
        <Grid item>
            <ShopItem 
                name={item.name}
                description={item.description}
                mainImg={item.main_img}
                altImg={item.alt_img}
                glazeDescription={item.glaze_description}
                sold={item.sold}
                productId={item.product_id}
            />
        </Grid>
      )
    )
  }, [props, props.scale, props.tabLst])

  return (
    <React.Fragment>
        <SubHeader
            name="Shop"
        >
            <PageBar
                setCurrTab={setCurrTab}
                currTab={currTab}
                tabLst={potteryTabs}
                scale={1.1}
            />
        </SubHeader>
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            sx={{
                marginTop: "2rem",
                marginBottom: "2rem",
                width: "100%"
            }}
        >
            {shopItemLst}
        </Grid>
    </React.Fragment>
  );
}
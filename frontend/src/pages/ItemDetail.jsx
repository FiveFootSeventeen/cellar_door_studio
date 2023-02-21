import React from "react";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";


export default function ItemDetail(props) {
  let { productId } = useParams();

  return (
    <React.Fragment>
        <Box>Test!</Box>
        <Box>{productId}</Box>
    </React.Fragment>
  );
}
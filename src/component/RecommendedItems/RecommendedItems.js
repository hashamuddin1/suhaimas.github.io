import React, { useState, useEffect } from "react";
import "../bestimesale/bestime.css";
import "../flashsale/sale.css";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import {
  onSnapshot,
  collection,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import db from "../../database/firebase";
import { useHistory } from "react-router-dom";
import Card from '@mui/material/Card';

import { useSelector } from "react-redux";
// import CardMedia from '@mui/material/CardMedia';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

export default function RecommendedItems() {
  const history = useHistory();
  // const [data, setData] = useState([]);

  const productD = useSelector((state) => state.product.initialState);
  const [product, setProduct] = React.useState([]);
  const [filterData, setFilterData] = React.useState([]);
  const [fvalue, setFvalue] = React.useState("");

  // useEffect(async () => {
  //   const collectionRef = collection(db, "product");
  //   const q = query(collectionRef, orderBy("rating", "asc"), limit(8));

  //   const unsub = onSnapshot(q, (snapshot) => {
  //     const newdata = snapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setData(newdata);
  //     FilterData()
  //   });

  //   return unsub;
  // }, []);




  const FilterData = () => {
    setFilterData(productD.filter((x) => x.category === fvalue));
  };

  React.useEffect(() => {
    const collectionProduct = collection(db, "CategoryBrand");
    const unsub = onSnapshot(collectionProduct, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProduct(data);
    });
    return unsub;
  }, []);



  return (
    <div className="containerf">
      <div style={{ marginTop: "3%" }}>
        <div style={{ display: "flex" }}>
          <FormControl className="catdrawR">
            <h1>BY BRANDS</h1>
            <RadioGroup
              aria-label="gender"
              name="controlled-radio-buttons-group"
              value={fvalue}
              onChange={(e) => setFvalue(e.target.value)}
              defaultValue='APPLE'
            >
              {product.map((data) => (
                <FormControlLabel

                  value={data.category}
                  control={<Radio />}
                  label={data.category}
                />
              ))}
              <Button variant="contained" onClick={FilterData}>
                Filter
              </Button>
            </RadioGroup>
          </FormControl>
          <div style={{ marginTop: "3%" }} className="catdata">
            <div className="main">
              <h1 className="heading">Recommended Items</h1>
              <Button
                onClick={() => {
                  history.push("/Recommendeditems");
                }}
                className="btns"
              >
                Shop more
              </Button>
            </div>
            <div className="mainf2">
              {fvalue == '' ?
                productD.slice(0, 8).map((data, i) => (
                  <Card key={i} className="cardf">
                    <div className="postf">
                      {/* <CardMedia
                        component="img"
                        height="140"
                        width="100% !important"

                        image={data.image}
                        alt="Paella dish"
                      /> */}
                      <img
                        className="cimg"
                        src={data.image}
                        alt="led" />
                      {/* <spna className="texts1">YOUNG SHOP</spna> */}
                      {/* <Box > */}
                      {/* <Typography  >
                        {data.name}
                        </Typography>
                        <Typography variant="caption" display="block" gutterBottom>
                        {data.spec}
                      </Typography> */}
                      <span className="texts2">{data.name}</span>
                      {/* <Divider /> */}
                      {/* <span className="texts2">{data.spec}</span> */}
                      {/* </Box> */}
                      {/* <Rating
                        name="simple-controlled"
                        value={data.rating}
                        readOnly
                      /> */}
                      <span className="rates">Rs: {data.rate}</span>
                    </div>
                  </Card>
                ))
                :
                filterData.map((data) => (
                  <Card className="cardf">
                    <div className="postf">
                      <img className="cimg" src={data.image} alt="led" />
                      {/* <spna className="texts1">YOUNG SHOP</spna> */}
                      <span className="texts2">{data.name}</span>
                      {/* <Divider /> */}
                      {/* <span className="texts2">{data.spec}</span> */}
                      {/* <Rating
                        name="simple-controlled"
                        value={data.rating}
                        readOnly
                      /> */}
                      <span className="rates">Rs: {data.rate}</span>
                    </div>
                  </Card>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

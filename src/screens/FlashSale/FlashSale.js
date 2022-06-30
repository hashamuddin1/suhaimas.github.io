import React, { useState, useEffect } from "react";
import "./FlashSale.css"
import "../../component/bestimesale/bestime.css";
import Divider from "@mui/material/Divider";
import Timer from "react-compound-timer";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import {
  onSnapshot,
  collection,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import db from "../../database/firebase";
// import { useHistory } from "react-router-dom";
import "../../component/flashsale/sale.css";
import "../BestSaleItem/BestSaleItem.css";
export default function FlashSale({ flashMore, isFEmpty, isFLoad }) {
  const history = useHistory();

  const flashD = useSelector((state) => state.flashSale.initialState);
  // const [product, setProduct] = React.useState([]);

  // useEffect(async () => {
  //   const collectionRef = collection(db, "timesale");
  //   const q = query(
  //     collectionRef,
  //     // orderBy("flashData.name", "asc")
  //     // limit(5)
  //   );

  //   const unsub = onSnapshot(q, (snapshot) => {
  //     const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //     setProduct(data);
  //   });

  //   return unsub;
  // }, []);



  const dataPass = (data) => {
    // console.log('main data', data)
    history.push({
      pathname: '/FlashProductDetail',
      // search: '?query=abc',
      state: { detail: data }
    });
    // history.push("/ProductDetail", data)
  }

  return (
    <>
      <h1 className="heading-f">Flash Sale</h1>
      <div className="main-counter1">
        <h2 className="heading2">On Sale Now</h2>

        <h2 className="heading-3">Ending in</h2>
        <div className="timer">
          <Timer initialTime={48 * 3600000} direction="backward">
            {() => (
              <React.Fragment>
                <span className="counter">
                  <Timer.Days />
                </span>
                <p>:</p>
                <span className="counter">
                  <Timer.Hours />
                </span>
                <p>:</p>
                <span className="counter">
                  <Timer.Minutes />
                </span>
                <p>:</p>
                <span className="counter">
                  <Timer.Seconds />
                </span>
              </React.Fragment>
            )}
          </Timer>
        </div>
        {/* <Button
          style={{ background: "coral", color: "white", borderRadius: "30px" }}
          variant="contained"
          className="btnS"
          onClick={flashPush}
        >
          Shop more
        </Button> */}
      </div>
      <Divider variant="middle" />
      <div className="container-ffs">
        <div className="mainfs-2">
          {/* <FlashSlider /> */}
          {flashD.map(data => (
            <Card
              style={{
                margin: '1%',
                cursor: 'pointer',
                // marginLeft: "2%",
                // height: '20em',
                // width: "30%"
              }}
              onClick={() => dataPass(data)}
              // lassName='Asilder'
              sx={{ maxWidth: 200 }}
              className="cardSli"
            >
              {/* <CardActionArea> */}
              {data.flashQuantity == 0 ?
                <>
                  <CardMedia
                    component="img"
                    height="200"
                    width='150'
                    image={data.image}
                    alt="green iguana"
                    className="cardSli-M"
                  />
                  <div style={{ backgroundColor: '#FFA500', position: 'relative', bottom: '100px', left: '5px', border: "1px solid #FFA500", borderRadius: "50%", width: '35%' }}>

                    <h6 style={{ fontWeight: "bold", fontSize: "12px", color: 'white', textAlign: 'center' }}>Sold</h6>
                  </div>
                  <CardContent>
                    <div className="artypo">

                      <Typography variant="body2" gutterBottom component="span">
                        {data.name}
                      </Typography>
                    </div>
                    {/* <div className="ari-spce-div">

<Typography variant="caption" color="text.secondary">
{data.flashData.spec}
</Typography>
</div> */}
                    <div className="disdivs">

                      {/* <span className="spec-ari">{data.spec}</span> */}
                      {/* <span className="rates">Rs: {data.flashData.rate}</span> */}
                      <div className="discount-fs">

                        <span
                          style={{ color: "coral", fontWeight: "bold" }}
                          className="textfs"
                        >
                          RS.{data.discountPrice}
                        </span>
                      </div>
                      <div className="discountfs">
                        <span className="disratefs">RS.{data.rate}</span>
                        <span className="disperfs">-{data.discountPercenage}%</span>
                      </div>
                    </div>
                  </CardContent>
                  {/* </CardActionArea> */}
                </>
                :
                <>
                  <CardMedia
                    component="img"
                    height="200"
                    width='150'
                    image={data.image}
                    alt="green iguana"
                    className="cardSli-M"
                  />
                  <CardContent>
                    <div className="artypo">

                      <Typography variant="body2" gutterBottom component="span">
                        {data.name}
                      </Typography>
                    </div>
                    {/* <div className="ari-spce-div">

<Typography variant="caption" color="text.secondary">
{data.flashData.spec}
</Typography>
</div> */}
                    <div className="disdivs">

                      {/* <span className="spec-ari">{data.spec}</span> */}
                      {/* <span className="rates">Rs: {data.flashData.rate}</span> */}
                      <div className="discount-fs">

                        <span
                          style={{ color: "coral", fontWeight: "bold" }}
                          className="textfs"
                        >
                          RS.{data.discountPrice}
                        </span>
                      </div>
                      <div className="discountfs">
                        <span className="disratefs">RS.{data.rate}</span>
                        <span className="disperfs">-{data.discountPercenage}%</span>
                      </div>
                    </div>
                  </CardContent>
                </>
              }
            </Card>
            //.....................................................................
            // <div className="cardf">
            //   <div className="postf">
            //     <img src={data.flashData.image} />
            //     <span className="textf">{data.flashData.name}</span>
            //     <span className="textf">{data.flashData.spec}</span>
            //     <span
            //       style={{ color: "coral", fontWeight: "bold" }}
            //       className="textf"
            //     >
            //       RS.{data.discountPrice}
            //     </span>
            //     <div className="discountf">
            //       <span className="disratef">RS.{data.flashData.rate}</span>
            //       <span className="disperf">-{data.discountPercenage}%</span>
            //     </div>
            //   </div>
            // </div>
          ))}
        </div>
      </div>
      {isFLoad &&
        <div style={{ textAlign: 'center !important', marginLeft: '50%', marginTop: '3%' }}>

          <CircularProgress style={{ margin: '3% 3%' }} disableShrink />
        </div>

      }
      {!isFEmpty && !isFLoad &&
        <div style={{ textAlign: 'center' }}>

          {/* <Button onClick={flashMore}>More</Button> */}
          <Stack
            // spacing={2}
            // direction="row"
            style={{ margin: '3% 5%' }}
          >
            <Button
              // variant="contained" 
              className="btnLog-2" onClick={flashMore}>
              Load More
            </Button>
          </Stack>
        </div>}

      {/* <div className="containerBs">
        <div className="mainf2">
          {product.map((data) => (
            <div className="cardf">
              <div className="postf">
                <img src={data.flashData.image} />
                <span className="textf">{data.name}</span>
                <span className="textf">{data.spec}</span>
                <span
                  style={{ color: "coral", fontWeight: "bold" }}
                  className="textf"
                >
                  RS.{data.discountPrice}
                </span>
                <div className="discountf">
                  <span className="disratef">RS.{data.flashData.rate}</span>
                  <span className="disperf">-{data.discountPercenage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
}

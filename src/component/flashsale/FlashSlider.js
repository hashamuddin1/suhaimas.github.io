import React, { useState, useEffect } from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {
  onSnapshot,
  collection,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import db from "../../database/firebase";
import led from "../../assets/led.png";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import "../../component/arrivalSilder/arrival.css";
import "../bestimesale/bestime.css";
import "../flashsale/sale.css";
import "../NewArivals/NewArrivals.css"
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export const FlashSlider = () => {
  const handleDragStart = (e) => e.preventDefault();


  const [product, setProduct] = useState([])
  const [value, setValue] = React.useState(5);
  const [flashD, setFlashD] = useState([])
  // const productD = useSelector((state) => state.flashSale.initialState);
  // const flashD = useSelector((state) => state.flashSale.initialState);
  const fetchData = useSelector((state) => state.flashSale.initialState);
  const history = useHistory();
  // useEffect(async () => {
  //   const collectionRef = collection(db, "timesale");
  //   const q = query(collectionRef,
  //     // orderBy("name", "asc"),
  //     // limit(8)
  //   );

  //   const unsub = onSnapshot(q, (snapshot) => {
  //     const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //     setProduct(data);
  //   });

  //   return unsub;
  // }, []);
  // console.log("timesale-->", product)

  useEffect(async () => {
    // const fetchData = useSelector((state) => state.flashSale.initialState);
    setFlashD(fetchData);
  }, [flashD])

  const dataPass = (data) => {
    // console.log('main data', data)
    history.push({
      pathname: '/FlashProductDetail',
      // search: '?query=abc',
      state: { detail: data }
    });
    // history.push("/ProductDetail", data)
  }


  const items =
    flashD
      // .slice(0, 20)
      .map((data, i) =>
        <Card
          style={{ margin: '7%', height: '20em', cursor: 'pointer', }}
          // lassName='Asilder'
          sx={{ maxWidth: 250 }}
          className="cardSli-a"
          key={i}
          onClick={() => dataPass(data)}
        >
          {/* <CardActionArea> */}
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

            {/* <span className="spec-ari">{data.spec}</span> */}
            {/* <span className="rates">Rs: {data.flashData.rate}</span> */}
            <div className="discount-f">

              <span
                style={{ color: "coral", fontWeight: "bold" }}
                className="textf"
              >
                RS.{data.discountPrice}
              </span>
            </div>
            <div className="discountf">
              <span className="disratef">RS.{data.rate}</span>
              <span className="disperf">-{data.discountPercenage}%</span>
            </div>
          </CardContent>
          {/* </CardActionArea> */}
        </Card>

      )
    ;
  return (
    // <div style={{ width: "1000px", border: "1px solid red" }} className="containerf">
    <div className="containerAs">
      {/* <h1>New Arrivals</h1> */}
      <div className="silder"
        style={{ width: "1200px", }}
      >
        <AliceCarousel
          infinite={true}
          autoPlayInterval={1800}
          autoWidth={true}
          disableButtonsControls={true}
          autoPlay={true}
          mouseTracking
          disableDotsControls={true}
          items={items}
        // className="ac"
        />

      </div>
    </div>
    // </div>
  );
}

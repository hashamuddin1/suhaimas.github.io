import React, { useState, useEffect } from "react";
import "./sale.css";
import Timer from "react-compound-timer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useHistory } from "react-router-dom";
import db from "../../database/firebase";
import {
  onSnapshot,
  collection,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { FlashSlider } from "./FlashSlider"
import { useSelector } from "react-redux";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import '../bestimesale/bestime.css'

function FlashSaleHome() {
  const [product, setProduct] = useState([])
  let history = useHistory();

  // const productD = useSelector((state) => state.flashSale.initialState);

  function flashPush() {
    history.push("flashSale");
  }

  // useEffect(async () => {
  //   const collectionRef = collection(db, "timesale");
  //   const q = query(collectionRef,
  //     orderBy("discountPercenage", "asc"),
  //     // limit(5)
  //   );

  //   const unsub = onSnapshot(q, (snapshot) => {
  //     const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //     setProduct(data);
  //   });

  //   return unsub;
  // }, []);

  // console.log(product.map(data => data.flashData.image))


  const dataPass = (data) => {
    // console.log('main data', data)
    history.push({
      pathname: '/FlashProductDetail',
      // search: '?query=abc',
      state: { detail: data }
    });
  }

  return (
    <div className="containerf">
      <h1 className="heading">Flash Sale</h1>
      <div className="main-counter">
        <h2 className="heading2">On Sale Now</h2>
        <h2 className="heading3">Ending in</h2>
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
        <Button
          style={{ background: "#FFA500", color: "white", borderRadius: "30px" }}
          variant="contained"
          className="btnS"
          onClick={() => history.push('/flashSale')}
        >
          Shop more
        </Button>
      </div>
      <Divider variant="middle" />
      <FlashSlider />
      {/* <div className="mainf2">
        {productD
        .slice(0, 8)
        .map(data => (
          <div className="cardf">
            <div className="postf">
              <img src={data.image} />
              <span className="textf">{data.name}</span>
              <span className="textf">{data.spec}</span>
              <span
                style={{ color: "coral", fontWeight: "bold" }}
                className="textf"
              >
                RS.{data.discountPrice}
              </span>
              <div className="discountf">
                <span className="disratef">RS.{data.rate}</span>
                <span className="disperf">-{data.discountPercenage}%</span>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>



    // ........................................................................................



  );
}

export default FlashSaleHome;

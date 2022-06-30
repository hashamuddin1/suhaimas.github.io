import React, { useEffect, useState } from "react";
import Silder from "../../component/Silder/Silder";
import estore from "../../assets/estore.png";
import "./Home.css";
import watch from "../../assets/watch.png";
import Button from "@mui/material/Button";
import led from "../../assets/led.png";
import headphone from "../../assets/headphone.png";
import iphone from "../../assets/iphone.png";
import car from "../../assets/car.png";
import drone from "../../assets/drone.png";
import kitchen from "../../assets/kitchen.png";
import lamp from "../../assets/lamp.png";
import FlashSaleHome from "../../component/flashsale/FlashsaleHome";
// import FlashSale from "../FlashSale/FlashSale"
import BesTimeSale from "../../component/bestimesale/besTimeSale";
import RecommendedItems from "../../component/RecommendedItems/RecommendedItems";
import ArrivalSilder from "../../component/arrivalSilder/ArrivalSilder";
// import Footer from "../../component/footer/Footer";
// import { FlashSlider } from "../../component/flashsale/FlashSlider";
import { NewArrivals } from "../../component/NewArivals/NewArrivals";
import { CheckArrivals } from "../../component/checkArrivals/CheckArrivals";
import { ToysArrivals } from "../../component/toysArrivals/ToysArrivals";
import { WatchesArrivals } from "../../component/watchesArrivals/WatchesArrivals";
import Categories from "../Categories/Categories";

import BestSaleItem from '../BestSaleItem/BestSaleItem';

import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  onSnapshot,
  collection,
  limit,
  orderBy,
  query,
  where, startAfter,
} from "firebase/firestore";
import db from "../../database/firebase";


import { useHistory } from "react-router-dom"

import { useSelector } from "react-redux";




export default function Home({ itemSearch, isLoad, isCatLoad, fetchMore, isEmpty, isPLoad }) {
  const history = useHistory()
  const [categoryD, setCategoryD] = React.useState([]);

  // const categoryD = useSelector((state) => state.category.initialState);

  const [lastFDocCat, setLastFDocCat] = useState([]);
  const [isFEmptyCat, setIsFEmptyCat] = useState(false)
  const [isFLoadCat, setIsFLoadCat] = useState(false)

  useEffect(async () => {
    const collectionRef = collection(db, "MainCategory");
    const q = query(
      collectionRef,
      limit(12)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const lastFDocCat = snapshot.docs[snapshot.docs.length - 1];
      setCategoryD(data);
      setLastFDocCat(lastFDocCat);
    });

    return unsub;
  }, []);


  // const flashD = useSelector((state) => state.flashSale.initialState);
  const fetchMoreCat = () => {
    setIsFLoadCat(true)

    const collectionRef = collection(db, "MainCategory");
    const q = query(
      collectionRef,
      startAfter(lastFDocCat),
      limit(12)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const isCollectionEmpty = snapshot.size === 0;
      if (!isCollectionEmpty) {
        const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const lastFDocCat = snapshot.docs[snapshot.docs.length - 1];
        setCategoryD(categoryD => [...categoryD, ...data]);
        setLastFDocCat(lastFDocCat);
      }
      else {
        setIsFEmptyCat(true);
      }
      setIsFLoadCat(false)

    });

    return unsub;

  }



  const submit = (data) => {
    // console.log('main data', data)
    history.push({
      pathname: '/Categories',
      // search: '?query=abc',
      state: { detail: data }
    });
    // history.push("/ProductDetail", data)
  }

  // console.log("<><><><><", itemSearch)
  return (
    <div>
      <Silder />
      <div className="main" >
        <div className="justify-content-md-center">
          {/* <img className="estore" src={estore} alt="estore" /> */}
          <h1 className="heading-cat" >Categories</h1>
          <div className="category" >
            {/* <div className="row1"> */}
            {
              categoryD
                // .slice(0, 8)
                .map((data, ind) => (

                  <div className="card1"
                    key={ind} onClick={() => submit(data)} style={{ cursor: 'pointer' }} >
                    <div className="border">
                      <img width="30%" src={data.image} alt="image" />
                      <div>
                        <div className="name1">{data.category}</div>
                        <div className="subname">{data.description}</div>
                        {/* <div className="subname">Men's Watches</div>
                        <div className="subname">Women's Watches</div> */}
                        {/* <Button
                          className="btn"
                          variant="contained"
                        // onClick={() => {
                        //   console.log("ok");
                        // }}
                        >
                          Browse
                        </Button> */}
                      </div>
                    </div>
                  </div>
                ))}



            {/* <Button
              // onClick={() => {
              //   history.push("/bestSale");
              // }}
              className="btns"
              id="btns"
            >
              Shop more
            </Button> */}
          </div>
          <div>
            {isFLoadCat &&

              <div style={{
                textAlign: 'center !important',
                // marginLeft: '50%' 
              }}>

                <CircularProgress disableShrink />
              </div>


            }
            {!isFEmptyCat && !isFLoadCat &&
              // <button
              //   style={{
              //     textAlign: 'center !important',
              //     // marginLeft: '50%' 
              //   }}
              //   onClick={fetchMoreCat}>
              //   More
              // </button>
              <KeyboardArrowDownIcon
                style={{
                  textAlign: 'center !important',
                  marginTop: '2%',
                  cursor: 'pointer',
                }}

                sx={{ height: "50px", width: "50px" }}
                onClick={fetchMoreCat}
              />
            }
          </div>
           {/* ......................................................... */}
           {/* <FlashSaleHome /> */}
           {/* ......................................................... */}
           {/* <FlashSale /> */}

           {/* ......................................................... */}
           {/* <FlashSlider /> */}
          {/* <BestSaleItem /> */}

          <ArrivalSilder isPLoad={isPLoad} isEmpty={isEmpty} fetchMore={fetchMore} />

          {/* <CheckArrivals /> */}
          
          {/* <ToysArrivals /> */}
          {/* <WatchesArrivals /> */}
           {/* <BesTimeSale isLoad={isLoad} isCatLoad={isCatLoad} itemSearch={itemSearch} /> */}
           {/* <RecommendedItems /> */}
          <NewArrivals />
           {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
}

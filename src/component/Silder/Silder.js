import React, { useState, useEffect } from "react";
import { Slide } from "react-slideshow-image";
import slide1 from "../../assets/slide1.jpg"
import slide2 from "../../assets/slide2.jpg"
// import slide5 from "../../assets/slide5.jpg"
import slide4 from "../../assets/slide4.jpg"
// import slide6 from "../../assets/slide6.jpg"
import slide3 from "../../assets/slide3.jpg"
import 'react-slideshow-image/dist/styles.css'
// import slider1 from '../../assets/slider1.jpg'
// import { ShopByCategory } from "../ShopByCategory/ShopByCategory";

import './silder.css'


import {
  onSnapshot,
  collection,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import db from "../../database/firebase";
import { height } from "@mui/system";

const Silder = () => {

  // const slideImages = [
  //   // <img src={slide1} />,
  //   // <img src={slide2} />,
  //   // <img src={slide3} />,
  //   // "../../assets/slide1.jpg",
  //   // 'import slide2 from "../../assets/slide2.jpg"',
  //   // 'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
  // ];

  const [banner, setBanner] = React.useState([]);
  useEffect(async () => {
    const collectionRef = collection(db, "webBanner");
    const q = query(
      collectionRef,
      // where("quantity", '>', 0),
      // orderBy("quantity"),
      // orderBy('name', 'desc'),
      // where("subcat", '==', 'BestSaleItem'),
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setBanner(data);
    });

    return unsub;
  }, []);

  // console.log("bbbb", banner)
  return (
    <div className="slider">

      <div 
      // style={{ border: '1px solid red', width: '100%', height: 'auto', padding: '0%' }}
      >
        <Slide
          arrows={false}
          auto={true}
        // style={{
        //   border: '1px solid red',
        //   width: '100%',
        //   height: '250px'
        // }}
        >

          {/* <div className="each-slide">
            <div
              style={{
                // 'backgroundImage': `url(${slideImages[0]})`,
                // backgroundImage: url("../../assets/slider3.jpg"),
              }}

            >
              <img src={slide1} style={{
                // backgroundSize: "contain", 
                width: "100%",
              }} />
            </div>
          </div> */}
          {banner.map((data, i) => (
            <div className="each-slide" key={i}>

              <div
                style={{
                  // 'backgroundImage': `url(${slideImages[0]})`,
                  // backgroundImage: url("../../assets/slider3.jpg"),
                }}

              >
                <img src={data.image} style={{
                  // backgroundSize: "contain", 
                  width: "100%",
                  height:"100%"
                }} />
              </div>
            </div>
          ))}
          {/* <div className="each-slide">

            <div
              style={{
                // 'backgroundImage': `url(${slideImages[0]})`,
                // backgroundImage: url("../../assets/slider3.jpg"),
              }}

            >
              <img src={slide3} style={{
                // backgroundSize: "contain", 
                width: "100%"
              }} />
            </div>
          </div> */}
          {/* <div className="each-slide">
            <div
              style={{
                // 'backgroundImage': `url(${slideImages[0]})`,
                // backgroundImage: url("../../assets/slider3.jpg"),
              }}

            >
              <img src={slide4} style={{
                // backgroundSize: "contain", 
                width: "100%"
              }} />
            </div>
          </div> */}
          {/* <div className="each-slide">
            <div
              style={{
                // 'backgroundImage': `url(${slideImages[0]})`,
                // backgroundImage: url("../../assets/slider3.jpg"),
              }}

            >
              <img src={slide2} style={{
                // backgroundSize: "contain", 
                width: "100%"
              }} />
            </div>
          </div> */}
          {/* <div className="each-slide">
            <div
            // style={{ 'backgroundImage': `url(${slideImages[1]})` }}
            >
              <img src={slide5} style={{
                // backgroundSize: "contain", 
                width: "100%"
              }} />
            </div>
          </div> */}
          {/* <div className="each-slide">
            <div
            // style={{ 'backgroundImage': `url(${slideImages[2]})` }}
            >
              <img src={slide6} style={{
                // backgroundSize: "contain", 
                width: "100%"
              }} />
            </div>
          </div> */}
          {/* <div className="each-slide">
            <div style={{ 'backgroundImage': `url(${slideImages[3]})` }}>
            </div>
          </div> */}
        </Slide>
      </div>
      {/* <ShopByCategory /> */}
    </div>

  )
};

export default Silder;
import React, { useState, useEffect } from "react";
import {
  onSnapshot,
  collection,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import db from "../../database/firebase";
import "../../component/flashsale/sale.css";
import "../BestSaleItem/BestSaleItem.css";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import { textAlign } from "@mui/system";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { ar } from "date-fns/locale";


export default function NewArrival({ isEmptyA, isLoadA, fetchMoreA }) {
  const history = useHistory();

  const arrivalD = useSelector((state) => state.arrival.initialState);

  // const [product, setProduct] = React.useState([]);
  // useEffect(async () => {
  //   const collectionRef = collection(db, "product");
  //   const q = query(
  //     collectionRef,
  //     orderBy("name", "asc")
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
      pathname: '/ProductDetail',
      // search: '?query=abc',
      state: { detail: data }
    });
    // history.push("/ProductDetail", data)
  }
  // console.log("ariiv", arrivalD)

  return (
    <>
      <h1 className="heading-f">New Arrivals</h1>
      <Divider variant="middle" />
      <div className="container-ff">
        <div className="mainf-2">
          {arrivalD
            // .slice(0, 50)
            .map((data, ind) => (
              // <div className="cardf">
              //   <div className="postf">
              //     <img  src={data.image} />
              //     <span className="textf">{data.name}</span>
              //     <span className="textf">{data.spec}</span>
              //     <span
              //       style={{ color: "coral", fontWeight: "bold" }}
              //       className="textf"
              //     >
              //       RS.{data.rate}
              //     </span>
              //     <div className="discountf">
              //       {/* <span className="disratef">RS.{data.flashData.rate}</span> */}
              //       {/* <span className="disperf">-{data.discountPercenage}%</span> */}
              //     </div>
              //   </div>
              // </div>

              //........................................................................
              <Card
                style={{
                  margin: '1%',
                  cursor: 'pointer',
                  // marginLeft: "2%",
                  // height: '20em',
                  // width: "30%"
                }}
                // lassName='Asilder'
                sx={{ maxWidth: 180 }}
                className="cardSli"
                // onClick={() => dataPass(data)}
                key={ind}
              >
                {data.quantity == 0 ?
                  <>
                    <Link to={`/ProductDetail/${data.name}`} style={{ textDecoration: 'inherit', color: 'inherit' }}>
                      {/* <CardActionArea> */}
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
{data.spec}
</Typography>
</div> */}
                        <div className="disdiv">

                          {/* <span className="spec-ari">{data.spec}</span> */}
                          {/* <span className="rates">Rs: {data.flashData.rate}</span> */}
                          <div className="discount-f">

                            <span
                              style={{ color: "coral", fontWeight: "bold" }}
                              className="textf"
                            >
                              {data.discountPrice ?
                                <>
                                  Rs: {data.discountPrice}
                                </>
                                :
                                <>
                                  Rs: {data.rate}
                                </>
                              }
                            </span>
                          </div>
                          {data.discountPrice ?
                            <div className="discountf">
                              <span className="disratef" >
                                {data.discountPrice ? <>
                                  RS.{data.rate}
                                </>
                                  :
                                  <>
                                    RS.{data.discountPrice}
                                  </>
                                }
                              </span>
                              <span className="disperf" >-{data.discountPercentage}%</span>
                            </div> : null
                          }
                          {/* <div className="discountf">
                    <span className="disratef">RS.{data.flashData.rate}</span>
                    <span className="disperf">-{data.discountPercenage}%</span>
                  </div> */}
                        </div>
                      </CardContent>
                      {/* </CardActionArea> */}
                    </Link>
                  </>
                  :

                  <>
                    <Link to={`/ProductDetail/${data.name}`} style={{ textDecoration: 'inherit', color: 'inherit' }}>
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
{data.spec}
</Typography>
</div> */}
                        <div className="disdiv">

                          {/* <span className="spec-ari">{data.spec}</span> */}
                          {/* <span className="rates">Rs: {data.flashData.rate}</span> */}
                          <div className="discount-f">

                            <span
                              style={{ color: "coral", fontWeight: "bold" }}
                              className="textf"
                            >
                              {data.discountPrice ?
                                <>
                                  Rs: {data.discountPrice}
                                </>
                                :
                                <>
                                  Rs: {data.rate}
                                </>
                              }
                            </span>
                          </div>
                          {data.discountPrice ?
                            <div
                              // style={{ marginTop: '10%', marginLeft: '-4%' }}
                              className="discountf">
                              <span className="disratef" >
                                {data.discountPrice ? <>
                                  RS.{data.rate}
                                </>
                                  :
                                  <>
                                    RS.{data.discountPrice}
                                  </>
                                }
                              </span>
                              <span className="disperf" >-{data.discountPercentage}%</span>
                            </div> : null
                          }
                          {/* <div className="discountf">
                    <span className="disratef">RS.{data.flashData.rate}</span>
                    <span className="disperf">-{data.discountPercenage}%</span>
                  </div> */}
                        </div>
                      </CardContent>
                    </Link>
                  </>
                }
              </Card>


            ))}
        </div>
      </div>
      <div>
        {isLoadA &&

          <div style={{ textAlign: 'center !important', marginLeft: '50%', marginTop: '3%' }}>

            <CircularProgress style={{ margin: '3% 3%' }} disableShrink />
          </div>


        }
        {!isEmptyA && !isLoadA &&
          // <button
          //   style={{ textAlign: 'center !important', marginLeft: '50%' }}
          //   onClick={fetchMoreA}>
          //   More
          // </button>
          <Stack
            // spacing={2}
            // direction="row"
            style={{ margin: '3% 5%' }}
          >
            <Button
              // variant="contained" 
              style={{
                // background: 'linear-gradient(190deg, #fa7c30 30%, rgba(0, 0, 0, 0)30%)'
                width:'20%',
                alignSelf:'center'
              }}
              className="btnLog-2" onClick={fetchMoreA}>
              Load More
            </Button>
          </Stack>
        }
      </div>
    </>
  );
}

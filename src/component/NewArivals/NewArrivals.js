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
import "./NewArrivals.css"
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export const NewArrivals = () => {
    const handleDragStart = (e) => e.preventDefault();


    // const [product, setProduct] = useState([])
    const [value, setValue] = React.useState(5);
    const history = useHistory();
    
    // useEffect(async () => {
    //     const collectionRef = collection(db, "product");
    //     const q = query(collectionRef,
    //         orderBy("name", "asc"),
    //         // limit(8)
    //     );

    //     const unsub = onSnapshot(q, (snapshot) => {
    //         const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //         setProduct(data);
    //     });

    //     return unsub;
    // }, []);
    // console.log("product", product)


    const dataPass = (data) => {
        console.log('main data', data)
        history.push({
            pathname: '/ProductDetail',
            // search: '?query=abc',
            state: { detail: data }
        });
        // history.push("/ProductDetail", data)
    }


    const arrivalD = useSelector((state) => state.arrival.initialState);
    const items =
        arrivalD
            .slice(0, 20)
            .map((data, i) =>
                <Card
                    style={{ margin: '7%', height: '20em', cursor: 'pointer', }}
                    // lassName='Asilder'
                    sx={{ maxWidth: 250 }}
                    className="cardSli-a"
                    // onClick={() => dataPass(data)}
                    key={i}
                >
                    <Link to={`/ProductDetail/${data.name}`} style={{ textDecoration: 'inherit', color: 'inherit' }}>
                        {/* <CardActionArea> */}
                        <CardMedia
                            component="img"
                            // height="200"
                            width='150'
                            image={data.image}
                            alt="green iguana"
                            key={i}
                        />
                        <CardContent>
                            <div className="artypo">

                                <Typography variant="body2" sx={{ lineHeight: 0 }} gutterBottom component="span">
                                    {data.name}
                                </Typography>
                            </div>
                            {/* <div className="ari-spce-div">

                        
                            <Typography variant="caption" color="text.secondary">
                                {data.spec}
                            </Typography>
                        </div> */}

                            {/* <span className="spec-ari">{data.spec}</span> */}
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
                    </Link>
                    {/* </CardActionArea> */}
                </Card>

            );




    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1
    // };
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 4,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 1500,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };
    return (
        // <div style={{ width: "1000px", border: "1px solid red" }} className="containerf">
        <div className="containerAs"  >
            <h1 style={{ color: 'white' }}>New Arrivals</h1>
            <div className="silder"
                style={{
                    width: "1200px",
                }}
            >
                {/* <AliceCarousel
                    infinite={true}
                    autoPlayInterval={1800}
                    autoWidth={true}
                    disableButtonsControls={true}
                    autoPlay={true}
                    mouseTracking
                    disableDotsControls={true}
                    items={items}
                // className="ac"
                /> */}
                <Slider {...settings}>
                    {arrivalD
                        .slice(0, 20)
                        .map((data, i) =>
                            <Card
                                style={{ height: '20em', cursor: 'pointer', }}
                                // lassName='Asilder'
                                sx={{ maxWidth: 190, maxHeight: 'auto' }}
                                className="cardSli-a"
                                // onClick={() => dataPass(data)}
                                key={i}
                            >
                                <Link to={`/ProductDetail/${data.name}`} style={{ textDecoration: 'inherit', color: 'inherit' }}>
                                    {/* <CardActionArea> */}
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        width='150'
                                        image={data.image}
                                        alt="green iguana"
                                        key={i}
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

                                        {/* <span className="spec-ari">{data.spec}</span> */}
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
                                </Link>
                                {/* </CardActionArea> */}
                            </Card>

                        )}
                </Slider>
            </div>
        </div>
        // </div>
    );
}

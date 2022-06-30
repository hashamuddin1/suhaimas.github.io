import React, { useState, useEffect } from "react";
import {
    onSnapshot,
    collection,
    limit,
    orderBy,
    query,
    where,
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
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// import Footer from '../../component/footer/Footer'


export default function Categories() {
    const history = useHistory();
    const location = useLocation();
    // const productD = useSelector((state) => state.product.initialState);
    const [product, setProduct] = React.useState([]);
    useEffect(async () => {
        const collectionRef = collection(db, "product");
        const q = query(
            collectionRef,
            where("quantity", '>', 0),
            orderBy("quantity"),
            // , limit(2)
        );

        const unsub = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setProduct(data);
        });

        return unsub;
    }, []);

    const dataPass = (data) => {
        // console.log('main data', data)
        history.push({
            pathname: '/ProductDetail',
            // search: '?query=abc',
            state: { detail: data }
        });
        // history.push("/ProductDetail", data)
    }


    // console.log("fliter.....>>", product.filter((data, i) => { for (var i = 0; i < data.category.length; i++) { if (data.category[i] === location.state.detail.category) { return data } } }))
    // console.log("location.state.detail.category....>>>", location.state.detail.category);

    return (
        <>
            <h1 className="heading-f">Categories</h1>
            <Divider variant="middle" />
            <div className="container-ff">
                <div className="mainf-2">
                    {product.filter((data, i) => { for (var i = 0; i < data.category.length; i++) { if (data.category[i] === location.state.detail.category) { return data } } }).map(data => (
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
                        >
                            {data.quantity == 0 ?


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
                                                    >  {data.discountPrice ?
                                                        <>
                                                            Rs.{data.discountPrice}
                                                        </>
                                                        :
                                                        <>
                                                            Rs.{data.rate}
                                                        </>
                                                        }
                                                    </span>
                                                </div>
                                                {data.discountPrice ?
                                                    <div className="discountf">
                                                        <span className="disratef" >

                                                            RS.{data.rate}


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
                                                    >  {data.discountPrice ?
                                                        <>
                                                            Rs.{data.discountPrice}
                                                        </>
                                                        :
                                                        <>
                                                            Rs.{data.rate}
                                                        </>
                                                        }
                                                    </span>
                                                </div>
                                                {data.discountPrice ?
                                                    <div className="discountf">
                                                        <span className="disratef" >

                                                            RS.{data.rate}


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
            {/* <Footer /> */}
        </>
    );
}

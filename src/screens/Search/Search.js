import React, {
    useState,
    useEffect
} from "react";
import {
    onSnapshot,
    collection,
    limit,
    orderBy,
    query,
    where,
    startAfter,
} from "firebase/firestore";
import db from "../../database/firebase";
import "../../component/flashsale/sale.css";
import "../BestSaleItem/BestSaleItem.css";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
// import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';

export const Search = ({ itemSearch }) => {

    // console.log("irtm...>>>>>", itemSearch)
    const history = useHistory();
    const [isFLoad, setIsFLoad] = useState(false)
    const product = useSelector((state) => state.productsearch.initialState);
    // const productF = useSelector((state) => state.flashSale.initialState);
    // const [product, setProduct] = React.useState([]);
    // useEffect(async () => {
    //     setIsFLoad(true)
    //     const collectionRef = collection(db, "product");
    //     const q = query(
    //         collectionRef,
    //         // where('name', '==', `${itemSearch}`)
    //         where("quantity", '>', 0),
    //         orderBy("quantity"),
    //         // orderBy("discountPrice", "asc")
    //         // limit(5)
    //     );

    //     const unsub = onSnapshot(q, (snapshot) => {
    //         const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //         setProduct(data);
    //         setIsFLoad(false)
    //     });

    //     return unsub;
    // }, []);



    // const [lastDoc, setLastDoc] = useState([]);

    // const [isEmpty, setIsEmpty] = useState(false)
    // const [isPLoad, setIsPLoad] = useState(false)

    // useEffect(async () => {
    //     setIsFLoad(true)
    //     const collectionRef = collection(db, "product");
    //     const q = query(collectionRef,
    //         where("quantity", ">", 0),
    //         orderBy("quantity"),
    //         // orderBy('name', 'desc'),
    //         limit(20)
    //     );

    //     const unsub = onSnapshot(q, (snapshot) => {
    //         const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //         const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    //         // setBestSale(data);
    //         // data.map((data) => {
    //         //   data.quantity == 0 ? null :
    //         //     dispatch(productData(data))
    //         // }
    //         // )
    //         setProduct(data);
    //         setIsFLoad(false)
    //         // dispatch(productData(data))
    //         // setIsLoad(false)
    //         setLastDoc(lastDoc);
    //     });

    //     return unsub;
    // }, []);

    // const productD = useSelector((state) => state.product.initialState);

    // const fetchMore = () => {
    //     setIsPLoad(true)
    //     // useEffect(async () => {
    //     const collectionRef = collection(db, "product");
    //     const q = query(collectionRef,
    //         where("quantity", '>', 0),
    //         orderBy("quantity"),
    //         // orderBy('name', 'desc'),
    //         startAfter(lastDoc),
    //         limit(20)
    //     );

    //     const unsub = onSnapshot(q, (snapshot) => {
    //         const isCollectionEmpty = snapshot.size === 0;
    //         if (!isCollectionEmpty) {

    //             const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //             const lastDoc = snapshot.docs[snapshot.docs.length - 1];

    //             setProduct(product => [...product, ...data])
    //             // setIsLoad(false)
    //             setLastDoc(lastDoc);
    //         } else {
    //             setIsEmpty(true);
    //         }
    //         setIsPLoad(false)
    //     });

    //     return unsub;
    //     // }, []);


    // }

    // const [productF, setProductF] = React.useState([]);
    // useEffect(async () => {
    //     const collectionRef = collection(db, "timesale");
    //     const q = query(
    //         collectionRef,
    //         // orderBy("discountPrice", "asc")
    //         // limit(5)
    //     );

    //     const unsub = onSnapshot(q, (snapshot) => {
    //         const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //         setProductF(data);
    //     });

    //     return unsub;
    // }, []);
    const productF = [];

    const dataPass = (data) => {
        // console.log('main data', data)
        history.push({
            pathname: '/ProductDetail',
            // search: '?query=abc',
            state: { detail: data }
        });
        // history.push("/ProductDetail", data)
    }
    const dataPassF = (data) => {
        // console.log('main data', data)
        history.push({
            pathname: '/FlashProductDetail',
            // search: '?query=abc',
            state: { detail: data }
        });
        // history.push("/ProductDetail", data)
    }

    // console.log("asc", productD.map(data => data.discountPercenage))
    return (
        <>
            <h1 className="heading-f">Search Results</h1>
            {isFLoad &&
                <div style={{ textAlign: 'center !important', marginLeft: '45%', marginTop: '3%' }}>

                    <CircularProgress style={{ margin: '3% 3%' }} disableShrink />
                </div>

            }
            <Divider variant="middle" />
            {!isFLoad &&

                <div className="container-ff">
                    <div className="mainf-2">
                        {product
                            .filter((data) => {
                                if (itemSearch == "") {
                                    return data
                                } else if (data.name.toLowerCase().includes(itemSearch.toLocaleLowerCase())) {
                                    return data
                                }
                            })
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
                                                            >{data.discountPrice ? <>
                                                                Rs.{data.discountPrice}
                                                            </>
                                                                : <>
                                                                    Rs.{data.rate}
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
                                                    </div>
                                                </CardContent>
                                            </Link>
                                        </>
                                    }
                                </Card>


                            ))}
                        {productF
                            .filter((data) => {
                                if (itemSearch == "") {
                                    return data
                                } else if (data.name.toLowerCase().includes(itemSearch.toLocaleLowerCase())) {
                                    return data
                                }
                            })
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
                                    onClick={() => dataPassF(data)}
                                    key={ind}
                                >
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
                                                </div>
                                            </CardContent>
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
                                                        >{data.discountPrice ? <>
                                                            Rs.{data.discountPrice}
                                                        </>
                                                            : <>
                                                                Rs.{data.rate}
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
                                                </div>
                                            </CardContent>
                                        </>
                                    }
                                </Card>


                            ))}
                    </div>
                </div>
            }
            {/* <div>
                {isPLoad &&
                    <div style={{ textAlign: 'center !important', marginLeft: '50%', marginTop: '3%' }}>

                        <CircularProgress
                            // style={{ margin: '3% 3%' }} 
                            disableShrink />
                    </div>
                }
                {!isEmpty && !isPLoad &&
                    // <button onClick={fetchMore}>
                    //   More
                    // </button>
                    <Stack
                        // spacing={2}
                        // direction="row"
                        style={{ margin: '3% 5%' }}
                    >
                        <Button
                            // variant="contained" 
                            className="btnLog-2" onClick={fetchMore}>
                            Load More
                        </Button>
                    </Stack>
                }
            </div> */}
        </>
    );
}

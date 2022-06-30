import React, { useState, useEffect } from "react";
import "./bestime.css";
import "../flashsale/sale.css";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { createMuiTheme } from '@mui/material/styles';
import {
  onSnapshot,
  collection,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import db from "../../database/firebase";
import Card from '@mui/material/Card';
import { useHistory, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productData } from "../../Store/Reducers/productReducer";
import { categoryData } from "../../Store/Reducers/mainCategoryReducer";
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Skeleton from '@mui/material/Skeleton';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const theme = createMuiTheme({
  overrides: {
    ListItemButton: {
      selected: {
        // Does not work:
        // background: 'red',

        // Does not work:
        // backgroundColor: 'red',

        // Works (without the need for !important)
        background: 'linear-gradient(45deg, red 30%, orange 90%)',

        // Works (must use !important):
        // backgroundColor: 'red !important',

        // Works (must use !important):
        // background: 'red !important',
      },
    },
  },
});
export default function BesTimeSale({ isCatLoad, isLoad }) {
  // const [product, setProduct] = React.useState([]);
  const history = useHistory();
  // const [bestSale, setBestSale] = useState([]);
  const [data, setData] = React.useState([]);

  // const dispatch = useDispatch();
  // const bestD = useSelector((state) => state.best.initialState);
  const categoryD = useSelector((state) => state.category.initialState);

  // console.log("PDATAREDUX>>>>>>", productD)
  // console.log("productbestSaleDREDUX>>>>>>", bestSale)



  // if (productD) {
  //   setIsLoad(false)
  // }
  // if (categoryD) {
  //   setIsCatLoad(false)
  // }
  // useEffect( () => {
  //   // if (productD) {
  //   //   setIsLoad(false)
  //   // }
  //   // if (categoryD) {
  //   //   setIsCatLoad(false)
  //   // }
  //   // productD ? setIsLoad(false) 
  //   // categoryD ? setIsCatLoad(false) 
  // }, [])
  // useEffect(() => {
  //   // if (!productD) {
  //   //   setIsLoad(false)
  //   // }
  //   // if (!categoryD) {
  //   //   setIsCatLoad(false)
  //   // }
  //   // productD ? setIsLoad(false) : setIsLoad(true)
  //   // categoryD ? setIsCatLoad(false) : null
  // }, [])
  // useEffect(async () => {
  //   const collectionRef = collection(db, "product");
  //   const q = query(collectionRef, orderBy("name", "desc")
  //     // , limit(40)
  //   );

  //   const unsub = onSnapshot(q, (snapshot) => {
  //     const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //     // setBestSale(data);
  //     // dispatch(productData(data))
  //     setIsLoad(false)
  //   });

  //   return unsub;
  // }, []);


  const [product, setProduct] = React.useState([]);
  useEffect(async () => {
    const collectionRef = collection(db, "product");
    const q = query(
      collectionRef,
      where("quantity", '>', 0),
      orderBy("quantity"),
      orderBy('name', 'desc'),
      where("subcat", '==', 'BestSaleItem'),
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProduct(data);
    });

    return unsub;
  }, []);




  // dispatch(productData(bestSale))

  // useEffect(async () => {
  //   const collectionProduct = collection(db, "MainCategory");

  //   const unsub = onSnapshot(collectionProduct, (snapshot) => {
  //     const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //     // setProduct(data);
  //     dispatch(categoryData(data))
  //     setIsCatLoad(false)
  //   });

  //   return unsub;
  // }, []);

  // createAsyncThunk(async () => {
  //   const collectionProduct = collection(db, "MainCategory");

  //   const unsub = onSnapshot(collectionProduct, (snapshot) => {
  //     const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //     setProduct(data);
  //     dispatch(categoryData(data))
  //   });

  //   return unsub;
  // });

  // console.log("categoryD", categoryD)
  // console.log("category", product.map(data => data.quantity > 0 && data.subcat == "BestSaleItem"))

  const [selectedIndex, setSelectedIndex] = React.useState();
  const [color, setcolor] = React.useState('');

  const handleListItemClick = (event, i) => {
    setSelectedIndex(i);
    // setcolor('orange')
  };

  const submit = (category, i) => {
    // handleListItemClick(i)
    // setData(bestD.filter((data, i) => { for (var i = 0; i < data.category.length; i++) { if (data.category[i] === category) { return data } } }))
    setData(product.filter((data, i) => { for (var i = 0; i < data.category.length; i++) { if (data.category[i] === category) { return data } } }))
    // console.log("cate", bestSale.filter((data, i) => { for (var i = 0; i < data.category.length; i++) { if (data.category[i] === category) { return data } } }))
    // console.log("cate", bestSale.filter((data, i) => data))
  }

  const dataPass = (data) => {
    // console.log('main data', data)
    history.push({
      pathname: '/ProductDetail',
      // search: '?query=abc',
      state: { detail: data }
    });
    // history.push("/ProductDetail", data)
  }

  // const hanldling = (category, i) => {
  //   submit(category)
  //   handleListItemClick(i)

  // }
  // if (productD) {
  //   setLoad(true)
  // }

  // const getColor = (category) => {
  //   if (category == category) {
  //     return '#91640F'
  //   }
  // }

  // const renderList = categoryD.map((data, i) => {
  //   return (
  //     <ListItemButton
  //       // style={{ backgroundColor: getColor(data.category) }} 
  //       key={i} onClick={() => submit(data.category)}>
  //       <ListItemText
  //         primaryTypographyProps={{
  //           width: "100%",
  //           lineHeight: "18px",
  //           fontSize: "14px !important"

  //         }}
  //         primary={data.category}
  //       />
  //     </ListItemButton>
  //   )
  // })
  // console.log("data", product)

  // const { productName } = useParams();

  // console.log("productName", productName)
  return (
    <>
      <div className="containerf">
        <div
          style={{
            marginTop: "6%",
            // backgroundColor: '#f5f5f5'
          }}
        >

          <div style={{
            display: "flex",
            // backgroundColor: '#f5f5f5',

          }}>
            {/* <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}> */}
            <List theme={theme} className="catdraw" component="nav" aria-label="main mailbox folders">
              <h1 style={{ marginLeft: '5%' }}>CATEGORIES</h1>
              {isCatLoad ?
                // <ListItemButton>
                <>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </>
                // </ListItemButton>
                : <>
                  {
                    // product ?
                    categoryD.map((data, i) => (
                      <ListItemButton
                        // classes={{ selected: classes.selected }}
                        selected={selectedIndex == i}
                        onClick={(event) => handleListItemClick(event, i)}
                        // style={{ backgroundColor: getColor(data.category) }} 
                        // style={{ backgroundColor: color }}
                        key={i}
                      // onClick={() => submit(data.category), handleListItemClick(i)}
                      // onClick={() => hanldling(data.category, i)}
                      >
                        <ListItemText
                          primaryTypographyProps={{
                            width: "100%",
                            lineHeight: "18px",
                            fontSize: "14px !important"

                          }}
                          act
                          primary={data.category}

                        />
                      </ListItemButton>
                    ))
                    // : categoryD.map((data, i) => (
                    //   <ListItemButton
                    //     // style={{ backgroundColor: getColor(data.category) }} 
                    //     key={i} onClick={() => submit(data.category)}>
                    //     <ListItemText
                    //       primaryTypographyProps={{
                    //         width: "100%",
                    //         lineHeight: "18px",
                    //         fontSize: "14px !important"

                    //       }}
                    //       primary={data.category}
                    //     />
                    //   </ListItemButton>
                    // ))
                  }</>
              }
            </List>
            {/* </Box> */}
            <div className="catdata">
              <div className="main">
                <h1 className="heading">Best Sale Item</h1>
                <Button
                  onClick={() => {
                    history.push("/bestSale");
                  }}
                  className="btns"
                >
                  Shop more
                </Button>
              </div>
              <div className="mainf2">
                {isLoad ? <>
                  <div className="cardf">
                    <div className="postf">
                      <Skeleton width={230} height={200} />
                      <span className="texts2">
                        <Skeleton />
                      </span>
                      <span className="rates">
                        <Skeleton />
                      </span>
                    </div>
                  </div>
                  <div className="cardf">
                    <div className="postf">
                      <Skeleton width={230} height={200} />
                      <span className="texts2">
                        <Skeleton />
                      </span>
                      <span className="rates">
                        <Skeleton />
                      </span>
                    </div>
                  </div>
                  <div className="cardf">
                    <div className="postf">
                      <Skeleton width={230} height={200} />
                      <span className="texts2">
                        <Skeleton />
                      </span>
                      <span className="rates">
                        <Skeleton />
                      </span>
                    </div>
                  </div>
                  <div className="cardf">
                    <div className="postf">
                      <Skeleton width={230} height={200} />
                      <span className="texts2">
                        <Skeleton />
                      </span>
                      <span className="rates">
                        <Skeleton />
                      </span>
                    </div>
                  </div>
                  <div className="cardf">
                    <div className="postf">
                      <Skeleton width={230} height={200} />
                      <span className="texts2">
                        <Skeleton />
                      </span>
                      <span className="rates">
                        <Skeleton />
                      </span>
                    </div>
                  </div>
                  <div className="cardf">
                    <div className="postf">
                      <Skeleton width={230} height={200} />
                      <span className="texts2">
                        <Skeleton />
                      </span>
                      <span className="rates">
                        <Skeleton />
                      </span>
                    </div>
                  </div>
                  <div className="cardf">
                    <div className="postf">
                      <Skeleton width={230} height={200} />
                      <span className="texts2">
                        <Skeleton />
                      </span>
                      <span className="rates">
                        <Skeleton />
                      </span>
                    </div>
                  </div>
                  <div className="cardf">
                    <div className="postf">
                      <Skeleton width={230} height={200} />
                      <span className="texts2">
                        <Skeleton />
                      </span>
                      <span className="rates">
                        <Skeleton />
                      </span>
                    </div>
                  </div>
                </>
                  : <>
                    {data == '' ?
                      product
                        .slice(0, 20)
                        // bestSale
                        // productD ? productD
                        // .filter((data) => {
                        //   if (itemSearch == "") {
                        //     return data
                        //   } else if (data.name.toLowerCase().includes(itemSearch.toLocaleLowerCase())) {
                        //     return data
                        //   }
                        //   console.log("b-Search-data", data)
                        // })
                        .sort(() => 0.5 - Math.random())
                        .map((data, i) =>
                          // data.quantity > 0 && data.subcat == "BestSaleItem" ?
                          <Card key={i}
                            // onClick={() => dataPass(data)}
                            className="cardf">
                            <div className="postf">
                              {/* <Link to="/ProductDetail"> */}


                              <Link to={`/ProductDetail/${data.name}`} style={{ textDecoration: 'inherit', color: 'inherit' }}>
                                <img className="cimg" src={data.image} alt="led" />
                                {/* </Link> */}
                                {/* <div style={{ backgroundColor: '#FFA500', position: 'relative', bottom: '100px', left: '5px', border: "1px solid #FFA500", borderRadius: "50%", width: '35%' }}>

                                  <h6 style={{ fontWeight: "bold", fontSize: "12px", color: 'white' }}>Sold</h6>
                                </div> */}
                                {/* <spna className="texts1">YOUNG SHOP</spna> */}
                                <span className="texts2">{data.name}</span>
                                {/* <Divider /> */}
                                {/* <span className="texts2">{data.spec}</span> */}
                                {/* <Rating
                          name="simple-controlled"
                          value={data.rating}
                          readOnly
                        /> */}

                                <span className="rates">
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
                              </Link>
                            </div>
                          </Card>
                          // :
                          //               <div className="postf">

                          //                 <img className="cimg" src={data.image} alt="led" />

                          //                 {/* <spna className="texts1">YOUNG SHOP</spna> */}
                          //                 <span className="texts2">{data.name}</span>
                          //                 {/* <Divider /> */}
                          //                 {/* <span className="texts2">{data.spec}</span> */}
                          //                 {/* <Rating
                          //   name="simple-controlled"
                          //   value={data.rating}
                          //   readOnly
                          // /> */}
                          //                 <span className="rates">

                          //                   {data.discountPrice ?
                          //                     <>
                          //                       Rs: {data.discountPrice}
                          //                     </>
                          //                     :
                          //                     <>
                          //                       Rs: {data.rate}
                          //                     </>
                          //                   }

                          //                 </span>
                          //                 {data.discountPrice ?
                          //                   <div className="discountf">
                          //                     <span className="disratef" >
                          //                       {data.discountPrice ? <>
                          //                         RS.{data.rate}
                          //                       </>
                          //                         :
                          //                         <>
                          //                           RS.{data.discountPrice}
                          //                         </>
                          //                       }
                          //                     </span>
                          //                     <span className="disperf" >-{data.discountPercentage}%</span>
                          //                   </div> : null
                          //                 }
                          //               </div>
                          // null

                        )
                      // : <h1>Loding..!!!!</h1>
                      : data
                        // .slice(0, 20)
                        .map((data, i) =>
                          // data.quantity > 0 && data.subcat == "BestSaleItem" ?
                          <Card key={i}
                            // onClick={() => dataPass(data)} 
                            className="cardf">
                            <div className="postf">
                              <Link to={`/ProductDetail/${data.name}`} style={{ textDecoration: 'inherit', color: 'inherit' }}>
                                <img className="cimg" src={data.image} alt="led" />
                                {/* <div style={{ backgroundColor: '#FFA500', position: 'relative', bottom: '100px', left: '5px', border: "1px solid #FFA500", borderRadius: "50%", width: '35%' }}>

                                <h6 style={{ fontWeight: "bold", fontSize: "12px", color: 'white' }}>Sold</h6>
                              </div> */}
                                {/* <spna className="texts1">YOUNG SHOP</spna> */}
                                <span className="texts2">{data.name}</span>
                                {/* <Divider /> */}
                                {/* <span className="texts2">{data.spec}</span> */}
                                {/* <Rating
                          name="simple-controlled"
                          value={data.rating}
                          readOnly
                        /> */}

                                <span className="rates">
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
                              </Link>
                            </div>
                          </Card>
                          // :
                          // null

                        )}</>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Skeleton count={5} /> */}

    </>
  );
}

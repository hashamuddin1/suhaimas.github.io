import React, { useState, useEffect } from "react";
import "../../component/bestimesale/bestime.css";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
// import Stack from '@mui/material/Stack';
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
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
import { useHistory, Link } from "react-router-dom";
import "../../component/flashsale/sale.css";
import "./BestSaleItem.css";
import Card from '@mui/material/Card';
import { useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from "@mui/material/Stack";
// import { productData } from "../../Store/Reducers/productReducer";
// import { categoryData } from "../../Store/Reducers/mainCategoryReducer";


export default function BestSaleItem() {
  // export default function BestSaleItem({ fetchMoreB, isEmptyB, isLoadB }) {
  const history = useHistory();
  // const [product, setProduct] = React.useState([]);
  const [bestSale, setBestSale] = useState([]);
  const [data, setData] = React.useState([]);


  // const dispatch = useDispatch();
  // const bestD = useSelector((state) => state.best.initialState);
  const categoryD = useSelector((state) => state.category.initialState);

  const [lastDocB, setLastDocB] = useState([]);

  const [isEmptyB, setIsEmptyB] = useState(false)
  const [isLoadB, setIsPLoadB] = useState(false)

  // const bestD = useSelector((state) => state.best.initialState);
  // useEffect(async () => {
  //   const collectionRef = collection(db, "product");
  //   const q = query(collectionRef,
  //     where("quantity", '>', 0),
  //     orderBy("quantity"),
  //     // where("subcat", '==', 'BestSaleItem'),
  //     // orderBy("subcat", 'desc'),
  //     // where("quantity", ">", 0),
  //     // orderBy("quantity"),
  //     limit(50)
  //   );

  //   const unsub = onSnapshot(q, (snapshot) => {
  //     const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //     const lastDocB = snapshot.docs[snapshot.docs.length - 1];
  //     setBestSale(data);
  //     // dispatch(bestData(data))
  //     // setIsPLoadB(false)
  //     setLastDocB(lastDocB);
  //   });

  //   return unsub;
  // }, []);


  // const fetchMoreB = () => {
  //   setIsPLoadB(true)
  //   // useEffect(async () => {
  //   const collectionRef = collection(db, "product");
  //   const q = query(collectionRef,
  //     where("quantity", '>', 0),
  //     orderBy("quantity"),
  //     // where("subcat", '==', 'BestSaleItem'),
  //     // orderBy("subcat", 'desc'),
  //     // where("quantity", ">", 0),
  //     // orderBy("quantity"),
  //     startAfter(lastDocB),
  //     limit(10)
  //   );

  //   const unsub = onSnapshot(q, (snapshot) => {
  //     const isCollectionEmpty = snapshot.size === 0;
  //     if (!isCollectionEmpty) {

  //       const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //       const lastDocB = snapshot.docs[snapshot.docs.length - 1];
  //       setBestSale(bestSale => [...bestSale, ...data]);
  //       // dispatch(bestData([...bestD, ...data]))
  //       // setIsLoad(false)
  //       setLastDocB(lastDocB);
  //     } else {
  //       setIsEmptyB(true);
  //     }
  //     setIsPLoadB(false)
  //   });

  //   return unsub;
  //   // }, []);


  // }

  useEffect(async () => {
    const collectionRef = collection(db, "product");
    const q = query(
      collectionRef,
      // orderBy("quantity"),
      // where("quantity", ">", 0),
      orderBy("name", 'desc'),
      // orderBy("subcat"),
      // where("subcat", '==', 'BestSaleItem'),
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setBestSale(data);
    });

    return unsub;
  }, []);


  const [selectedIndex, setSelectedIndex] = React.useState();
  const [color, setcolor] = React.useState('');

  const handleListItemClick = (event, i) => {
    setSelectedIndex(i);
    // setcolor('orange')
  };

  const submit = (category, i) => {
    setData(bestSale.filter((data, i) => { for (var i = 0; i < data.category.length; i++) { if (data.category[i] === category) { return data } } }))
    // console.log("cat>>>", bestSale.filter((data, i) => { for (var i = 0; i < data.category.length; i++) { if (data.category[i] === category) { return data } } }))
    //   abc.category[i]
    // }))
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
  // console.log("daFIlr>>>", data)



  // console.log("daFIlr>>>", bestD)


  return (
    <>
      <h1 className="heading-f">Best Sale</h1>
      <div className="containerBs">

        <div className='cont' >
          <div
            style={{ display: "flex", }}
          >
            <List className="catdraw">
              <h1>CATEGORIES</h1>
              {categoryD.map((data, i) => (
                <ListItemButton key={i}
                  // onClick={() => submit(data.category)}
                  selected={selectedIndex == i}
                  onClick={(event) => handleListItemClick(event, i)}
                >
                  <ListItemText
                    primaryTypographyProps={{
                      width: "100%",
                      lineHeight: "18px",
                      fontSize: "14px !important"
                    }}
                    primary={data.category}
                  />
                </ListItemButton>
              ))}
            </List>
            <div className="catdata">

              <div className="mainf2" style={{ marginTop: '6%' }} >
                {data == '' ?
                  bestSale
                    .sort(() => 0.5 - Math.random())
                    .map((data) =>
                      data.quantity > 0 && data.subcat == "BestSaleItem" ? (
                        <Card
                          // onClick={() => dataPass(data)}
                          className="cardf1">

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
                                {/* <Stack spacing={2} direction="row">
                          <Button className="ratesATCBTN" variant="contained" >Add To Card</Button>
                        </Stack> */}
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
                        </Card>)

                        :

                        //     <div className="postf">
                        //       <img className="cimg" src={data.image} alt="led" />
                        //       {/* <spna className="texts1">YOUNG SHOP</spna> */}
                        //       <span className="texts2">{data.name}

                        //       </span>
                        //       {/* <Divider /> */}
                        //       {/* <span className="texts2">{data.spec}</span> */}
                        //       {/* <Rating
                        //   name="simple-controlled"
                        //   value={data.rating}
                        //   readOnly
                        // /> */}
                        //       <span className="rates">
                        //         {data.discountPrice ?
                        //           <>
                        //             Rs: {data.discountPrice}
                        //           </>
                        //           :
                        //           <>
                        //             Rs: {data.rate}
                        //           </>
                        //         }
                        //         {/* <Stack spacing={2} direction="row">
                        //     <Button className="ratesATCBTN" variant="contained" >Add To Card</Button>
                        //   </Stack> */}
                        //       </span>
                        //       {data.discountPrice ?
                        //         <div className="discountf">
                        //           <span className="disratef" >
                        //             {data.discountPrice ? <>
                        //               RS.{data.rate}
                        //             </>
                        //               :
                        //               <>
                        //                 RS.{data.discountPrice}
                        //               </>
                        //             }
                        //           </span>
                        //           <span className="disperf" >-{data.discountPercentage}%</span>
                        //         </div> : null
                        //       }
                        //     </div>
                        null


                    )
                  : data.map((data) =>
                    data.quantity > 0 && data.subcat == "BestSaleItem" ?
                      <Card
                        // onClick={() => dataPass(data)}
                        className="cardf1">

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
                              {/* <Stack spacing={2} direction="row">
                          <Button className="ratesATCBTN" variant="contained" >Add To Card</Button>
                        </Stack> */}
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
                      :
                      //     <div className="postf">
                      //       <img className="cimg" src={data.image} alt="led" />
                      //       {/* <spna className="texts1">YOUNG SHOP</spna> */}
                      //       <span className="texts2">{data.name}

                      //       </span>
                      //       {/* <Divider /> */}
                      //       {/* <span className="texts2">{data.spec}</span> */}
                      //       {/* <Rating
                      //   name="simple-controlled"
                      //   value={data.rating}
                      //   readOnly
                      // /> */}
                      //       <span className="rates">
                      //         {data.discountPrice ?
                      //           <>
                      //             Rs: {data.discountPrice}
                      //           </>
                      //           :
                      //           <>
                      //             Rs: {data.rate}
                      //           </>
                      //         }
                      //         {/* <Stack spacing={2} direction="row">
                      //     <Button className="ratesATCBTN" variant="contained" >Add To Card</Button>
                      //   </Stack> */}
                      //       </span>
                      //       {data.discountPrice ?
                      //         <div className="discountf">
                      //           <span className="disratef" >
                      //             {data.discountPrice ? <>
                      //               RS.{data.rate}
                      //             </>
                      //               :
                      //               <>
                      //                 RS.{data.discountPrice}
                      //               </>
                      //             }
                      //           </span>
                      //           <span className="disperf" >-{data.discountPercentage}%</span>
                      //         </div> : null
                      //       }
                      //     </div>
                      null


                  )
                }
              </div>
            </div>
          </div>
        </div>{" "}
        {/* <div>
          {isLoadB &&

            <div style={{ textAlign: 'center !important', marginLeft: '50%', marginTop: '3%' }}>

              <CircularProgress style={{ margin: '3% 3%' }} disableShrink />
            </div>


          }
          {!isEmptyB && !isLoadB &&
            // <button
            //   style={{ textAlign: 'center !important', marginLeft: '50%' }}
            //   onClick={fetchMoreB}>
            //   More
            // </button>
            <Stack
              // spacing={2}
              // direction="row"
              style={{ margin: '3% 5%' }}
            >
              <Button
                // variant="contained" 
                className="btnLog-2" onClick={fetchMoreB}>
                Load More
              </Button>
            </Stack>
          }
        </div> */}
      </div>
    </>
  );
}

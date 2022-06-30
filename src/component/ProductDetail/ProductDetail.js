import React, { useState, useEffect } from "react";
// import "./AddToCart.css"
import "./ProductDetail.css";
// import Iphone from "../../assets/iphone.png";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
// import Checkbox from "@mui/material/Checkbox";
// import Avatar from "@mui/material/Avatar";

// import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

// import IconButton from "@mui/material/IconButton";
// import Input from "@mui/material/Input";

// import InputLabel from "@mui/material/InputLabel";
// import InputAdornment from "@mui/material/InputAdornment";

// import FormControl from "@mui/material/FormControl";
// import TextField from "@mui/material/TextField";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
// import Typography from '@mui/material/Typography';
// import TextareaAutosize from "@mui/material/TextareaAutosize";
// // import "../../screens/Login/Login.css";
// // import "../../screens/Register/Register.css";
// import { Link } from "react-router-dom";
// import {
//   // AppBar,
//   // Toolbar,
//   // IconButton,
//   // Typography,
//   // Badge,
//   // MenuItem,
//   // Menu,
//   // List,
//   ListItemText,
// } from "@mui/material";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import {
//   doc,
//   setDoc,
//   collection,
//   addDoc,
//   onSnapshot,
//   orderBy,
//   query,
// } from "firebase/firestore";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  doc,
  updateDoc,
  increment,
  docRef,
  orderBy,
  deleteDoc,
  getDocs,
  setDoc,
  where,
} from "firebase/firestore";
import db from "../../database/firebase";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { browserHistory } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';



import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';





const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  // p: 4,
  textAlign: "center",
};


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});




export const ProductDetail = ({ cartCount }) => {
  // const Item = styled(Paper)(({ theme }) => ({
  //     ...theme.typography.body2,
  //     padding: theme.spacing(1),
  //     textAlign: 'center',
  //     color: theme.palette.text.secondary,
  // }));
  // console.log("data ---->", data.location)
  // let [count, setCount] = useState(0);

  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const history = useHistory();

  const [checked, setChecked] = useState();

  const handleChangeChecked = (event) => {
    setChecked(event.target.checked);
    // setDisable(false);
  };

  const [value, setValue] = useState(0);

  const [textReview, setTextReview] = useState('');

  // console.log("VALUE>>>>>>>", value)
  // console.log("REaview>>>>>>>", textReview)

  // const [reviews, setReviews] = useState([])


  // useEffect(async () => {
  //   const collectionRef = collection(db, "reviews");
  //   const q = query(collectionRef
  //     // orderBy("name", "asc"),
  //     // limit(8)
  //   );

  //   const unsub = onSnapshot(q, (snapshot) => {
  //     const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //     setReviews(data);
  //   });

  //   return unsub;
  // }, []);
  // console.log("reviews....>>>>", reviews)



  const location = useLocation();

  // const [userData, setUserData] = useState()
  // useEffect(() => {
  //   // console.log("path....", location.pathname); // result: '/secondpage'
  //   // console.log("search....", location.search); // result: '?query=abc'
  //   console.log("state....", location.state.detail); // result: 'some_value'
  // }, [location]);


  const udata = useSelector((state) => state.user.initialState);
  // setUserData(udata)
  // console.log("udata---->>>", udata)
  // console.log("LLLLudata---->>>", location.state.detail)

  const [open, setOpen] = React.useState(false);
  const [openCart, setOpenCart] = React.useState(false);
  const [openl, setOpenl] = React.useState(false);
  const [openlEmpty, setOpenlEmpty] = React.useState(false);
  const [openlEmptySize, setOpenlEmptySize] = React.useState(false);
  const [openlEmptyColorSize, setOpenlEmptyColorSize] = React.useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };


  const [counter, setsetCounter] = React.useState(1);

  const counterInc = (detail) => {
    // console.log("detailinc", detail)
    if (counter < detail.quantity) {

      // await updateDoc(collectionRef, {
      //   count: increment(+1),
      // }
      // )
      setsetCounter(counter + 1)
    }
  }

  const counterDec = (detail) => {
    // console.log("detaildec", detail)
    if (counter > 1) {
      // updateDoc(collectionRef, {
      //   count: increment(- 1),
      // });
      setsetCounter(counter - 1)

    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleClosel = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenl(false);
  };

  const handleCloselEmpty = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenlEmpty(false);
  };

  const handleCloselEmptySize = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenlEmptySize(false);
  };
  const handleCloselEmptyColorSize = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenlEmptyColorSize(false);
  };

  const handleCloseCart = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenCart(false);
  };




  const [size, setSize] = React.useState('');
  // const [openSize, setOpenSize] = React.useState(false);

  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };

  // const handleCloseSize = () => {
  //   setOpenSize(false);
  // };

  // const handleOpenSize = () => {
  //   setOpenSize(true);
  // };

  const [color, setColor] = React.useState('');


  const handleColor = (data) => {
    setColor(data)
  }

  // console.log("color", color)
  // let productID;
  // let productIDEC;
  // // console.log("productID1", productID)
  // console.log("productIDEC1", productIDEC)
  // for (var i = 0; i < cartCount.length; i++) {
  //   if (cartCount[i].id == location.state.detail.id) {
  //     console.log("cartCount", cartCount[i].count)
  //     // productID = counter + cartCount[i].count;
  //     // productIDEC = cartCount[i].count - counter;
  //     productIDEC = counter - cartCount[i].count;
  //     // console.log("productID2", productID)
  //     console.log("productIDEC2", productIDEC)
  //   }
  // }
  // // console.log("productID3", productID)
  // console.log("productIDEC3", Math.abs(productIDEC))
  const { productName } = useParams();
  // console.log("productName", productName)

  const [product, setProduct] = React.useState([]);
  useEffect(async () => {
    const collectionRef = collection(db, "product");
    const q = query(
      collectionRef,
      where("quantity", '>', 0),
      orderBy("quantity"),
      // orderBy('name', 'desc'),
      where("name", '==', `${productName}`),
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProduct(data);
    });

    return unsub;
  }, []);

  // console.log("dtatata", product)

  const AddToCart = async () => {
    if (udata.id) {
      if (product[0].color.length && product[0].size.length) {
        if (color && size) {
          let productID = false;
          for (var i = 0; i < cartCount.length; i++) {
            if (cartCount[i].id == product[0].id) {
              productID = true;
            }
          }

          if (productID) {
            setOpenCart(true)
            const docRef = doc(db, 'addToCart', `${udata.id}`, `${udata.id}`, `${product[0].id}`);
            await updateDoc(docRef, {
              count: increment(counter),
            })

            // const docRefUpdate = doc(db, "product", `${location.state.detail.id}`);
            // await updateDoc(docRefUpdate, {
            //   quantity: increment(- counter),
            // })

            setTimeout(() => {
              history.push("/AddToCart");
            }, 3000)
          }
          else {


            setDoc(doc(db, `addToCart`, `${udata.id}`, `${udata.id}`, `${product[0].id}`), {
              product: product[0],
              userId: udata.id,
              count: counter,
              size: size,
              color: color,
            })
              .then(setOpen(true))

              .then(
                setTimeout(() => {
                  history.push("/AddToCart");
                  // history.go(0)
                }, 3000)
              )


            // const docRef = doc(db, "product", `${location.state.detail.id}`);
            // await updateDoc(docRef, {
            //   quantity: increment(- counter),
            // })

          }
        }
        else {
          setOpenlEmptyColorSize(true)

        }
      }
      else if (product[0].color.length) {
        if (color) {
          let productID = false;
          for (var i = 0; i < cartCount.length; i++) {
            if (cartCount[i].id == product[0].id) {
              productID = true;
            }
          }

          if (productID) {
            const docRef = doc(db, 'addToCart', `${udata.id}`, `${udata.id}`, `${product[0].id}`);
            await updateDoc(docRef, {
              count: increment(counter),
            })

            // const docRefUpdate = doc(db, "product", `${location.state.detail.id}`);
            // await updateDoc(docRefUpdate, {
            //   quantity: increment(- counter),
            // })
            setOpenCart(true)
            setTimeout(() => {
              history.push("/AddToCart");
            }, 3000)
          }
          else {


            setDoc(doc(db, `addToCart`, `${udata.id}`, `${udata.id}`, `${product[0].id}`), {
              product: product[0],
              userId: udata.id,
              count: counter,
              size: size,
              color: color,
            })
              .then(setOpen(true))

              .then(
                setTimeout(() => {
                  history.push("/AddToCart");
                  // history.go(0)
                }, 3000)
              )


            // const docRef = doc(db, "product", `${location.state.detail.id}`);
            // await updateDoc(docRef, {
            //   quantity: increment(- counter),
            // })

          }
        }
        else {
          setOpenlEmpty(true)

        }
      }
      else if (product[0].size.length) {
        if (size) {
          let productID = false;
          for (var i = 0; i < cartCount.length; i++) {
            if (cartCount[i].id == product[0].id) {
              productID = true;
            }
          }

          if (productID) {
            setOpenCart(true)
            const docRef = doc(db, 'addToCart', `${udata.id}`, `${udata.id}`, `${product[0].id}`);
            await updateDoc(docRef, {
              count: increment(counter),
            })

            // const docRefUpdate = doc(db, "product", `${location.state.detail.id}`);
            // await updateDoc(docRefUpdate, {
            //   quantity: increment(- counter),
            // })
            setTimeout(() => {
              history.push("/AddToCart");
            }, 3000)
          }
          else {


            setDoc(doc(db, `addToCart`, `${udata.id}`, `${udata.id}`, `${product[0].id}`), {
              product: product[0],
              userId: udata.id,
              count: counter,
              size: size,
              color: color,
            })
              .then(setOpen(true))

              .then(
                setTimeout(() => {
                  history.push("/AddToCart");
                  // history.go(0)
                }, 3000)
              )


            // const docRef = doc(db, "product", `${location.state.detail.id}`);
            // await updateDoc(docRef, {
            //   quantity: increment(- counter),
            // })

          }
        }
        else {
          setOpenlEmptySize(true)
        }
      }
      else {

        setDoc(doc(db, `addToCart`, `${udata.id}`, `${udata.id}`, `${product[0].id}`), {
          product: product[0],
          userId: udata.id,
          count: counter,
          size: size,
          color: color,
        })
          .then(setOpen(true))
          .then(
            setTimeout(() => {
              history.push("/AddToCart");
            }, 3000)
          )

        // const docRef = doc(db, "product", `${location.state.detail.id}`);
        // await updateDoc(docRef, {
        //   quantity: increment(- counter),
        // })

      }
      // }
    } else {

      setOpenl(true)

      setTimeout(() => {
        history.push('/Login');
        // history.go(0)
      }, 3000)


    }

  };

  // const submit = () => {

  //   setDoc(doc(db, 'reviews', `${location.state.detail.id}`), {
  //     uid: udata.id,
  //     name: udata.fullname,
  //     rating: value,
  //     review: textReview,
  //     productID: location.state.detail.id,
  //   })
  // }

  // console.log(">>>>>>>>>?????", reviews.map((data) => console.log(data)))
  // console.log(">>>>>>>>>?????", location.state)
  // console.log("SIZE>>>>>", size)

  // console.log("addCart", cartCount)

  return (
    <div className="divProLog">
      <div className="divProForm">
        {product.length ?

          <Box sx={{ flexGrow: 1 }}>
            <Grid className="gridPro-1" container spacing={0}>
              <Grid className="gridPro-grid" item xs={12} md={6}>
                {/* <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  "& > :not(style)": {
                    m: 2,
                    width: "100%",
                    height: "100%",
                  },
                }}
              > */}
                {/* <Paper elevation={2} > */}

                {/* <Paper className="Propper" elevation={2}> */}
                <div className="ProCart-Main">
                  {/* <h1>udhuifqwgfuigqwuifgbqwuifguiqwfgbuiqwfguqwfbqwfuqbwfuqwfbuqwfbuibuiqw</h1> */}
                  {/* <img
                  className="ProcartImg-1"
                  src={location.state.detail.image}
                  alt="Iphone"
                /> */}
                  <Carousel
                    className="ProcartImg-1"
                    showStatus={false}
                  >

                    {product[0].image.map((ele, i) => (

                      <div key={i}>

                        <img src={ele} />

                      </div>
                    ))}


                  </Carousel>
                  {/* <div className="head4Div">
                                            <h4 className="head4">IPhone wefasdsadascasew</h4>
                                            <p className="cart-pera">nvsdivioghsdionc</p>
                                        </div> */}
                  {/* <div>


                                            <h5>Rs : 15 </h5>
                                            <DeleteIcon />
                                        </div> */}
                  {/* <button className="countbtn" onClick={() => setCount(count - 1)}>-</button> */}
                  {/* <button onClick={() => setCount(count + 1)} > +</button> */}

                </div>
                {/* </Paper>
              </Box> */}
              </Grid>
              <Grid className="Progrid-grid" item xs={12} md={6}>
                {/* <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  "& > :not(style)": {
                    m: 2,
                    width: "100%",
                    height: "100%",
                  },
                }}
              >
                <Paper className="Propper-1" elevation={2}> */}
                <div className="ProCart-Main-1">
                  <div className="ProHead">
                    <h2>{product[0].name}</h2>
                  </div>
                  <div>
                    <Typography dangerouslySetInnerHTML={{ __html: product[0].description }} variant="body2" className="proDes" gutterBottom>
                      {/* {location.state.detail.description} */}
                      {/* <div dangerouslySetInnerHTML={{ __html: location.state.detail.description }}></div> */}
                    </Typography>
                  </div>
                  {/* <div className="Prorte">
                  <Rating
                    name="simple-controlled"
                    value={location.state.detail.rating}
                    readOnly
                  />
                </div> */}
                  <div className="ProPquan">

                    <h3 className="ProPquan6">

                      Quantity :{product[0].quantity}
                    </h3>
                  </div>
                  <div className="ProPprice">
                    {/* <h6>Subtotal (5 items)</h6> */}
                    <h3 className="ProPpriceh6">
                      {product[0].discountPrice ?
                        <>
                          Rs : {product[0].discountPrice}
                        </>
                        :
                        <>

                          Rs : {product[0].rate}
                        </>}
                    </h3>
                    {product[0].discountPrice ?
                      <>
                        <span className="strike">Rs : {product[0].rate}</span>
                        <span> -{product[0].discountPercentage}%</span>
                      </>
                      : null
                    }
                  </div>
                  {product[0].color.length > 0 ?
                    <div className="ProSize">
                      <h3>Color</h3>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                        {
                          product[0].color.map((data, i) => (
                            <div key={i}
                              style={{
                                // background: data,
                                backgroundColor: data,
                                padding: '10px',
                                width: '5px',
                                height: '5px',
                                // borderRadius: '20px',
                                marginBottom: '3%',
                                marginLeft: '1.5%',
                                cursor: 'pointer',
                                // border: `2px solid ${color}`,
                              }}
                              onClick={() => handleColor(data)}
                              className="ProColorClick"
                            ></div>
                          ))
                        }
                      </div>
                      {color ?
                        <div>
                          <h6>Selected Color</h6>
                          <div
                            style={{
                              // background: data,
                              backgroundColor: color,
                              padding: '10px',
                              width: '5px',
                              height: '5px',
                              // borderRadius: '20px',
                              // marginBottom: '3%',
                              marginLeft: '1.5%',
                              // cursor: 'pointer',
                              // border: `2px solid ${color}`,
                            }}
                          >

                          </div>
                        </div> : null
                      }
                    </div> : null
                  }
                  {product[0].size.length > 0 ?
                    <div className="ProSize">
                      <h3>Size</h3>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Select Size</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={size}
                            label="Select Size"
                            onChange={handleChangeSize}
                          >
                            {product[0].size.map((data, i) => (

                              <MenuItem key={i} value={data}>{data}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                    :
                    null
                  }
                  <div className="proCountBtn">
                    <Stack direction="row">
                      <Button className="proCountbtn" variant="text"
                        onClick={() => counterDec(product[0])}
                      >-</Button>

                    </Stack>
                    <p>{counter}</p>
                    <Stack direction="row">

                      <Button className="proCountbtn" variant="text"
                        onClick={() => counterInc(product[0])}
                      >+</Button>
                    </Stack>
                  </div>
                  <div className="PropBTN">
                    {/* <Stack spacing={2} direction="row">
                                                <Button variant="contained" className="btnLog-2">
                                                    Buy Now
                                                </Button>
                                            </Stack>
                                            <br /> */}
                    {/* </div> */}
                    {/* <div> */}
                    {product[0].quantity <= 0 ?
                      // <Stack spacing={2} direction="row">
                      //   <Button variant="contained" className="btnLog-2" disabled onClick={() => AddToCart()}>
                      //     Add To Cart
                      //   </Button>
                      // </Stack>
                      <div style={{ backgroundColor: '#FFA500', border: "1px solid #FFA500", borderRadius: "50%", width: '25%' }}>

                        <h6 style={{ fontWeight: "bold", fontSize: "12px", color: 'white' }}>Sold</h6>
                      </div>
                      :
                      <Stack spacing={2} direction="row">
                        <Button variant="contained" className="btnLog-2" onClick={() => AddToCart()}>
                          Add To Cart
                        </Button>
                      </Stack>
                    }
                  </div>
                  <Stack spacing={2} sx={{ width: '100%' }}>
                    {/* <Button variant="outlined" onClick={handleClick}>
                      Open success snackbar
                    </Button> */}
                    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Item Added Successfully!
                      </Alert>
                    </Snackbar>
                    <Snackbar open={openl} autoHideDuration={3000} onClose={handleClosel}>
                      <Alert onClose={handleClosel} severity="error" sx={{ width: '100%' }}>
                        Please Login!
                      </Alert>
                    </Snackbar>
                    <Snackbar open={openlEmpty} autoHideDuration={3000} onClose={handleCloselEmpty}>
                      <Alert onClose={handleCloselEmpty} severity="error" sx={{ width: '100%' }}>
                        Please Select Color!
                      </Alert>
                    </Snackbar>
                    <Snackbar open={openlEmptySize} autoHideDuration={3000} onClose={handleCloselEmptySize}>
                      <Alert onClose={handleCloselEmptySize} severity="error" sx={{ width: '100%' }}>
                        Please Select Size!
                      </Alert>
                    </Snackbar>
                    <Snackbar open={openlEmptyColorSize} autoHideDuration={3000} onClose={handleCloselEmptyColorSize}>
                      <Alert onClose={handleCloselEmptyColorSize} severity="error" sx={{ width: '100%' }}>
                        Please Select Color & Size!
                      </Alert>
                    </Snackbar>
                    <Snackbar open={openCart} autoHideDuration={3000} onClose={handleCloseCart}>
                      <Alert onClose={handleCloseCart} severity="warning" sx={{ width: '100%' }}>
                        Item Added
                      </Alert>
                    </Snackbar>
                    {/* <Alert severity="error">This is an error message!</Alert>
                    <Alert severity="warning">This is a warning message!</Alert>
                    <Alert severity="info">This is an information message!</Alert>
                    <Alert severity="success">This is a success message!</Alert> */}
                  </Stack>
                  {/* <div>
                                            <h3>Order Summary</h3>
                                        </div>
                                        
                                        <div>
                                            <div className="rs">
                                                <h6>Subtotal (5 items)</h6>
                                                <h6>Rs : 15</h6>
                                            </div>
                                            <div className="rs">
                                                <h6>Shipping Fee</h6>
                                                <h6>Rs : 15</h6>
                                            </div>
                                        </div>
                                        <div className="frmBtn">

                                            <Box
                                                component="form"
                                                sx={{
                                                    '& .MuiTextField-root': { m: 1, width: '20ch' },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <div className="input-code">
                                                    <TextField
                                                        id="standard-textarea"
                                                        label="Enter Voucher Code"
                                                        // placeholder="Placeholder"
                                                        // multiline
                                                        variant="standard"
                                                    />
                                                </div>
                                            </Box>
                                            <Stack spacing={2} direction="row">

                                                <Button className="countbtn1" variant="contained" >Apply</Button>
                                            </Stack>
                                        </div>
                                        <div>
                                            <div className="rs">
                                                <h6>Total</h6>
                                                <h6>Rs : 15</h6>
                                            </div>
                                        </div>
                                        <div className="countbtn-2">
                                            <Stack spacing={2} direction="row">
                                                <Button className="countbtn2" variant="contained" >PROCEED TO CHECKOUT</Button>
                                            </Stack>
                                        </div> */}
                </div>
                {/* </Paper>
              </Box> */}
              </Grid>
              {/* <Grid className="grid-grid" item xs={6} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  "& > :not(style)": {
                    m: 2,
                    width: "100%",
                    height: "100%",
                  },
                }}
              >
                <Paper className="pper-1" elevation={2}>
                  <div className="Review-main">
                    <div>
                      <h5>Reviews</h5>
                    </div>

                    {
                      reviews.map((data) =>

                        <div className="Ava-Main">
                          <div className="Ava"> */}
              {/* <div className="Ava-div">
                          <Avatar sx={{ height: "80px", width: "80px" }} />
                        </div> */}
              {/* <div className="Ava-head">
                              <h3>{data.name}</h3>
                              <Box>
                                <Typography variant="body2" gutterBottom>{data.review}</Typography>
                              </Box>
                            </div>
                          </div>
                          <div className="Ava-rate">
                            <Rating
                              name="simple-controlled"
                              value={data.rating}
                              readOnly
                            />
                          </div>
                          <br />
                        </div>
                      )}
                  </div>
                </Paper> */}
              {/* </Box>
            </Grid>
            <Grid className="grid-grid" item xs={6} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  "& > :not(style)": {
                    m: 2,
                    width: "100%",
                    height: "100%",
                  },
                }}
              >
                <Paper className="pper-1" elevation={2}>
                  <div className="Review-main">
                    <div>
                      <h5>BE THE FIRST TO REVIEW </h5>
                    </div>
                    <div>
                      <p>
                        Your email address will not be published. Required
                        fields are marked
                      </p>
                    </div>
                    <div>
                      <span>
                        <p className="Ava">
                          Your rating :
                          <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                            }}
                          />
                        </p>
                      </span>
                    </div>
                    <div>
                      <p>Your review</p>
                      <TextareaAutosize
                        aria-label="minimum height"
                        minRows={4}
                        value={textReview}
                        // placeholder="Minimum 3 rows"
                        style={{ width: "100%", marginBottom: '2%' }}
                        onChange={(e) => setTextReview(e.target.value)}
                      />
                    </div>
                    <div> */}
              {/* <Box
                        component="form"
                        sx={{
                          "& .MuiTextField-root": { m: 1, width: "30ch" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <div className="review-input">
                          <div className="emailGrid-Div">
                            <TextField
                              className="emailGridDiv"
                              id="standard-textarea"
                              label="Name"
                              variant="standard"
                            // onChange={handleChange("fullname")}
                            />
                          </div>
                          <div className="emailGrid-Div">
                            <TextField
                              className="emailGridDiv"
                              id="standard-textarea"
                              label="Email"
                              variant="standard"
                            // onChange={handleChange("fullname")}
                            />
                          </div>
                        </div>
                        <div className="divCheck">
                          <Checkbox
                            checked={checked}
                            onChange={handleChangeChecked}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                          <span className="checkSpan">
                            Save my name, email, and website in this browser for
                            the next time I comment.
                          </span>
                        </div>
                      </Box> */}

              {/* <Stack spacing={2} direction="row">
                        <Button
                          variant="contained"
                          // disabled={disable}
                          className="btn-Log"
                          onClick={() => submit()}
                        >
                          SUBMIT
                        </Button>
                      </Stack>
                    </div>
                  </div>
                </Paper>
              </Box>
            </Grid> */}
            </Grid>
          </Box>
          :
          null
        }
      </div>
    </div>
  );
};

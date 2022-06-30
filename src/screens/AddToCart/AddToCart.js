// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// // import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
import "./AddToCart.css";
// // import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Iphone from "../../assets/iphone.png";
import DeleteIcon from "@mui/icons-material/Delete";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

//--------------------------------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { useInput } from '@mui/core';
// import { styled } from '@mui/system';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
// import { purple } from '@mui/material/colors';
import "../Login/Login.css";
// import { Link } from 'react-router-dom'
import {
  // AppBar,
  // Toolbar,
  // IconButton,
  // Typography,
  // Badge,
  // MenuItem,
  // Menu,
  // List,
  ListItemText,
} from "@mui/material";
import {
  onSnapshot,
  collection,
  limit,
  orderBy,
  query,
  updateDoc,
  increment,
  doc,
  deleteDoc,
} from "firebase/firestore";
import db from "../../database/firebase";

// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import { border } from "@mui/system";
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

export const AddToCart = ({ cartCount }) => {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  let [count, setCount] = useState(0);
  const [country, setCountry] = useState("Pakistan");
  const [region, setRegion] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const selectRegion = (val) => {
    // setCountry('pakistan');
    setRegion(val);
  };



  const inc = async (id, count, product) => {
    const collectionRef = doc(db, `${udata.id}`, id);
    if (product.flashQuantity) {

      if (count < product.flashQuantity) {

        await updateDoc(collectionRef, {
          count: increment(+1),
        })
      }
    } else {
      if (count < product.quantity) {

        await updateDoc(collectionRef, {
          count: increment(+1),
        }
        )
      }
    }
    // : null
    // console.log("data...>>>", product.quantity)
  };

  const dec = (id, count) => {
    const collectionRef = doc(db, `${udata.id}`, id);
    if (count > 1) {
      updateDoc(collectionRef, {
        count: increment(- 1),
      });
    }
  };

  // const [cartCount, setCart] = useState([]);

  // console.log("cart.....>", cartCount)


  const history = useHistory();
  const udata = useSelector((state) => state.user.initialState);
  // console.log("udata", udata)


  //...............................................................................................................


  // useEffect(async () => {
  //   const collectionRef = collection(db, `${udata.id}`);
  //   const q = query(collectionRef);

  //   const unsub = onSnapshot(q, (snapshot) => {
  //     const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //     setCart(data);
  //     // console.log("DADADADADAD...>>>>>>", data)
  //   });

  //   return unsub;
  // }, []);


  const [values, setValues] = useState({
    fullName: udata.fullname,
    phone: udata.phone,
    city: "",
    address: "",
  });

  // console.log("values", values)

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };



  const del = async (data) => {
    // console.log("data", data)
    // await deleteDoc(doc(db, `${udata.id}`, data.id));
    await deleteDoc(doc(db, 'addToCart', `${udata.id}`, `${udata.id}`, data.id));


    // if (data.product.flashQuantity) {
    //   const docRef = doc(db, "timesale", `${data.product.id}`);
    //   await updateDoc(docRef, {
    //     flashQuantity: increment(data.count),
    //   })
    // } else {
    //   const docRef = doc(db, "product", `${data.product.id}`);
    //   await updateDoc(docRef, {
    //     quantity: increment(data.count),
    //   })
    // }
  };




  let Dcont = cartCount.map((data) => data.count);
  let Drate = cartCount.map((data) => {
    if (data.product.discountPrice) {

      return data.product.discountPrice
    } else {
      return data.product.rate
    }
  });
  let multi = Dcont.reduce(function (r, a, i) {
    return r + a * Drate[i];
  }, 0);

  // console.log('Dcont', Dcont)
  // console.log('Drate', Drate)
  // console.log('total', multi)

  const dataPush = () => {
    // for (let i = 0; i < cartCount.length; i++) {

    // values.city && values.address ?
    history.push({
      pathname: "/CheckOut",
      // search: '?query=abc',
      state: {
        detail: cartCount,
        total: multi,
        user: {
          Gender: udata.Gender,
          date: udata.date,
          email: udata.email,
          fullname: udata.fullname,
          phone: udata.phone,

        },
        // address: values,
      },
    })
    // :
    // alert("Please Fill Empty Fields ...!!!")
    // }
  };


  // const [ifCart, setIfCart] = useState(false)

  // useEffect(() => {


  //   cart ? setIfCart(true) : setIfCart(false);
  //   // const location = useLocation();
  //   //  console.log("state....", location.state.detail);
  // }

  //   , [])
  // console.log("if..", ifCart)
  return (
    <div className="divLog">
      <div className="divForm" style={{ border: "1px solid", background: 'none', }}>
        {
          cartCount.length ?
            <Box sx={{ flexGrow: 1 }}>
              <Grid className="grid-1" container spacing={2}>
                <Grid className="grid-grid" item xs={6} md={8}>
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
                    {/* <Paper elevation={2} > */}
                    {cartCount.map((data, i) => (
                      <Card sx={{ minWidth: 275 }} key={i}>
                        <CardContent>
                          {/* <Paper className="pper" elevation={2} > */}
                          <div className="Cart-Main">
                            <img
                              className="cartImg"
                              src={data.product.image}
                              alt="Iphone"
                              key={i}
                            />
                            <div className="head4Div">
                              <h4 className="head4">{data.product.name}</h4>
                              <p className="cart-pera">{data.product.spec}</p>
                            </div>
                            <div>
                              {data.product.discountPrice ?
                                <h5>Rs : {data.product.discountPrice} </h5> : <h5>Rs : {data.product.rate} </h5>
                              }
                              <DeleteIcon style={{ cursor: 'pointer !important' }} onClick={() => del(data)} />
                            </div>
                            {/* <div className="countBtn">
                              <Stack direction="row">
                                <Button
                                  className="countbtn"
                                  variant="text"
                                  onClick={() => dec(data.id, data.count)}
                                >
                                  -
                                </Button>
                              </Stack>
                              <p>{data.count}</p>
                              <Stack direction="row">
                                <Button
                                  className="countbtn"
                                  variant="text"
                                  onClick={() => inc(data.id, data.count, data.product)}
                                >
                                  +
                                </Button>
                              </Stack>
                            </div> */}
                            <div >
                              {/* <Stack direction="row">
                                <Button
                                  className="countbtn"
                                  variant="text"
                                  onClick={() => dec(data.id, data.count)}
                                >
                                  -
                                </Button>
                              </Stack>
                              <p>{data.count}</p>
                              <Stack direction="row">
                                <Button
                                  className="countbtn"
                                  variant="text"
                                  onClick={() => inc(data.id, data.count, data.product)}
                                >
                                  +
                                </Button>
                              </Stack> */}
                              <p style={{ fontWeight: 'bold', fontSize: 14 }}>

                                Qty : {data.count}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {/* </Paper > */}
                  </Box>
                </Grid>
                <Grid className="grid-grid" item xs={6} md={4}>
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
                      <div className="Cart-Main-1">
                        <div>
                          <h3>Order Summary</h3>
                        </div>
                        <div>
                          {cartCount.map((data) => (
                            <div className="rs">
                              <h6>Subtotal : {data.product.name}</h6>
                              {/* <h5></h5> */}
                              {data.product.discountPrice ?
                                <h6>Rs : {data.count * data.product.discountPrice}</h6> :
                                <h6>Rs : {data.count * data.product.rate}</h6>
                              }
                              {/* {setTotalRate(data.count * data.data.rate)} */}
                            </div>
                          ))}
                          <div className="rs">
                            <h6>Shipping Fee</h6>
                            <h6>Rs : 200</h6>
                          </div>
                        </div>
                        {/* <div className="frmBtn">
                          <Box
                          component="form"
                          sx={{
                            "& .MuiTextField-root": { m: 1, width: "20ch" },
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
                          <Button className="countbtn1" variant="contained">
                              Apply
                              </Button>
                              </Stack>
                            </div> */}
                        <div>
                          <div className="rs">
                            <h6>Total</h6>
                            <h6>Rs : {multi + 200}</h6>
                          </div>
                        </div>
                        <div className="countbtn-2">
                          <Stack spacing={2} direction="row">
                            <Button
                              className="countbtn2"
                              // onClick={handleOpen}
                              // onClick={handleOpen}
                              onClick={() => dataPush()}
                              variant="contained"
                            >
                              PROCEED TO CHECKOUT
                            </Button>
                          </Stack>
                        </div>
                        <div className="countbtn-2">
                          <Stack spacing={2} direction="row">
                            <Button
                              className="countbtn2"
                              onClick={() => setTimeout(() => { history.push('/') }, 1000)}
                              variant="contained"

                            >
                              Continue Shopping
                            </Button>
                          </Stack>
                        </div>
                      </div>
                    </Paper>
                  </Box>
                </Grid>
              </Grid>
              <div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Text in a modal
                                  </Typography> */}
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      {/* <Grid className="grid-1" container spacing={0}>
                        <Grid className="grid-grid" item xs={6} md={12}> */}
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

                      {/* <Paper className="pper" elevation={2}> */}
                      <div className="ChekHead-form-1">
                        <h2>Delivery Information</h2>
                      </div>
                      {/* <Grid className="Chekgrid-1" container spacing={0}>
                            <Grid className="Chekgrid-grid" item xs={6} md={6}> */}
                      <Box
                        component="form"
                        sx={{
                          "& .MuiTextField-root": {
                            // m: 1,
                            width: "30ch",
                          },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <div>
                          <TextField
                            id="standard-textarea"
                            label="Full Name"
                            // placeholder="Placeholder"
                            // multiline
                            variant="standard"
                            disabled
                            defaultValue={udata.fullname}
                          // on={() => setValues({ fullName: udata.fullname })}
                          />
                        </div>
                        <div>
                          <TextField
                            id="standard-number"
                            label="Phone Number"
                            type="number"
                            disabled
                            defaultValue={udata.phone}
                            // onChange={handleChange("phone")}
                            // InputLabelProps={{
                            //     shrink: true,
                            // }}
                            variant="standard"
                          />
                        </div>
                      </Box>
                      {/* </Grid> */}
                      {/* <Grid className="Chekgrid-grid" item xs={6} md={6}> */}
                      <div className="ChekGender">
                        <FormControl
                          variant="standard"
                          sx={{ m: 2, width: "30ch" }}
                        >
                          <InputLabel disabled id="demo-simple-select-standard-label">
                            Pakistan
                          </InputLabel>
                          {/* <CountryDropdown value={country} disabled /> */}
                        </FormControl>
                      </div>
                      <div></div>
                      <div className="ChekGender">
                        <FormControl
                          variant="standard"
                          sx={{ m: 2, width: "30ch" }}
                        >
                          {/* <RegionDropdown
                                        country={country}
                                        value={region}
                                        onChange={(val) => selectRegion(val)}
                                      /> */}
                        </FormControl>
                      </div>
                      <div className="ChekGender">
                        <FormControl
                          variant="standard"
                          sx={{ m: 1, width: "30ch" }}
                        >
                          <TextField
                            id="standard-number"
                            label="City"
                            type="text"
                            onChange={handleChange("city")}
                            // InputLabelProps={{
                            //     shrink: true,
                            // }}
                            variant="standard"
                          />
                        </FormControl>
                      </div>
                      <Box
                        component="form"
                        sx={{
                          "& .MuiTextField-root": {
                            // m: 1,
                            width: "30ch",
                          },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <div>
                          <TextField
                            id="standard-textarea"
                            label="Address"
                            // placeholder="Placeholder"
                            // multiline
                            variant="standard"
                            onChange={handleChange("address")}
                          />
                        </div>
                        <div className="ChekformDBtn">
                          <Stack spacing={2} direction="row">
                            <>
                              {/* {values.city && values.address ? */}

                              <Button
                                // onClick={() => dataPush()}
                                className="ChekformDBtn2"
                                variant="contained"
                              >
                                Save
                              </Button>


                              {/* : */}
                              {/* <Button
                                  onClick={() => dataPush()}
                                  className="ChekformDBtn2"
                                  variant="contained"
                                  disabled
                                >
                                  Save
                                </Button> */}
                              {/* }/ */}
                            </>
                            {/* <>
                              {values.address ?
                                <Button
                                  onClick={() => dataPush()}
                                  className="ChekformDBtn2"
                                  variant="contained"
                                >
                                  Save
                                </Button>
                                :
                                <Button
                                  onClick={() => dataPush()}
                                  className="ChekformDBtn2"
                                  variant="contained"
                                  disabled
                                >
                                  Save
                                </Button>
                              }
                            </> */}
                          </Stack>
                        </div>
                      </Box>
                      {/* </Grid>
                          </Grid> */}
                      {/* </Paper>
                          </Box> */}
                      {/* </Grid> */}
                      {/* </Grid> */}
                    </Typography>
                  </Box>
                </Modal>
              </div>
            </Box>

            : <h1>No Product Found In The Cart</h1>
        }
      </div>
    </div >
  );
};

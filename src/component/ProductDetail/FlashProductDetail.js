// import "./AddToCart.css"
import "./ProductDetail.css";
import Iphone from "../../assets/iphone.png";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";

import React, { useState, useEffect } from "react";
// import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";

import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import "../../screens/Login/Login.css";
import "../../screens/Register/Register.css";
import { Link } from "react-router-dom";
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
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
    doc,
    setDoc,
    updateDoc,
    increment,
    collection,
    addDoc,
    onSnapshot,
} from "firebase/firestore";
import db from "../../database/firebase";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';



// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';



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

export const FlashProductDetail = () => {
    // const Item = styled(Paper)(({ theme }) => ({
    //     ...theme.typography.body2,
    //     padding: theme.spacing(1),
    //     textAlign: 'center',
    //     color: theme.palette.text.secondary,
    // }));
    // console.log("data ---->", data.location)
    let [count, setCount] = useState(0);

    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    const history = useHistory();

    const [checked, setChecked] = useState();

    const handleChangeChecked = (event) => {
        setChecked(event.target.checked);
        // setDisable(false);
    };
    const location = useLocation();

    // useEffect(() => {
    //   // console.log("path....", location.pathname); // result: '/secondpage'
    //   // console.log("search....", location.search); // result: '?query=abc'
    // console.log("state....", location.state.detail); // result: 'some_value'
    // }, [location]);


    const udata = useSelector((state) => state.user.initialState);


    const [open, setOpen] = React.useState(false);
    const [openl, setOpenl] = React.useState(false);

    // const handleClick = () => {
    //   setOpen(true);
    // };

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


    const [counter, setsetCounter] = React.useState(1);

    const counterInc = (detail) => {
        // console.log("detailinc", detail)
        if (counter < detail.flashQuantity) {

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


    const AddToCart = async () => {
        if (udata.id) {

            // udata.id ?
            // (
            // setDoc(doc(db, `${udata.id}`, `${location.state.detail.id}${udata.id}`), {
            setDoc(doc(db, `addToCart`, `${udata.id}`, `${udata.id}`, `${location.state.detail.id}${udata.id}`), {
                product: location.state.detail,
                userId: udata.id,
                count: counter,
                size: size,
                color: color,
            })
                .then(setOpen(true))
                .then(setTimeout(() => {
                    history.push("/AddToCart");
                    // history.go(0)
                }, 3000))
            // .then(setInterval(() => {
            //   // history.push("/AddToCart");
            //   history.go(0)
            // }, 7000))


            const docRef = doc(db, "timesale", `${location.state.detail.id}`);
            await updateDoc(docRef, {
                flashQuantity: increment(- counter),
            })

        } else {

            // .then(alert("Item Added To Cart ...!!!!"))
            // alert("Item Added To Cart ...!!!!")
            // setOpen(true)
            // )
            // : 
            // (
            setOpenl(true)

            setTimeout(() => {
                history.push('/Login');
                // history.go(0)
            }, 3000)
        }
        // setInterval(() => { history.go(0) }, 3000) 
        // : null
        // )
    };
    return (
        <div className="divProLog">
            <div className="divProForm">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid className="gridPro-1" container spacing={0}>
                        <Grid className="gridPro-grid" item xs={6} md={6}>
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

                                    {location.state.detail.image.map((ele, i) => (

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
                                {/* <div className="countBtn">
                                            <Stack direction="row">
                                                <Button className="countbtn" variant="text" onClick={() => setCount(count - 1)}>-</Button>
  
                                            </Stack>
                                            <p>{count}</p>
                                            <Stack direction="row">

                                                <Button className="countbtn" variant="text" onClick={() => setCount(count + 1)} >+</Button>
                                            </Stack>
                                        </div> */}
                            </div>
                            {/* </Paper> */}
                            {/* </Box> */}
                        </Grid>
                        <Grid className="Progrid-grid" item xs={6} md={6}>
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
                                <Paper className="pper-1" elevation={2}> */}
                            <div className="ProCart-Main-1">
                                <div className="ProHead">
                                    <h3>{location.state.detail.name}</h3>
                                </div>
                                <div>
                                    <Typography dangerouslySetInnerHTML={{ __html: location.state.detail.description }} variant="body2" className="proDes" gutterBottom>
                                        {/* {location.state.detail.description} */}
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

                                        Quantity :{location.state.detail.flashQuantity}
                                    </h3>
                                </div>
                                <div className="ProPprice">
                                    {/* <h6>Subtotal (5 items)</h6> */}
                                    <h3 className="ProPpriceh6">
                                        Rs : {location.state.detail.discountPrice}
                                    </h3>
                                    <span className="strike">Rs : {location.state.detail.rate}</span>
                                    <span> {`-${location.state.detail.discountPercenage}%`}</span>
                                </div>
                                {location.state.detail.color.length > 0 ?
                                    <div className="ProSize">
                                        <h3>Color</h3>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                                            {
                                                location.state.detail.color.map((data, i) => (
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
                                {location.state.detail.size.length > 0 ?
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
                                                    {location.state.detail.size.map((data, i) => (

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
                                            onClick={() => counterDec(location.state.detail)}
                                        >-</Button>

                                    </Stack>
                                    <p>{counter}</p>
                                    <Stack direction="row">

                                        <Button className="proCountbtn" variant="text"
                                            onClick={() => counterInc(location.state.detail)}
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
                                    {location.state.detail.flashQuantity <= 0 ?
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
                                        <div className="Ava-Main">
                                            <div className="Ava">
                                                <div className="Ava-div">
                                                    <Avatar sx={{ height: "80px", width: "80px" }} />
                                                </div>
                                                <div className="Ava-head">
                                                    <h3>Name</h3>
                                                    <Box>
                                                        <Typography variant="body2" gutterBottom>
                                                            body2. Lorem ipsum dolor sit amet, body2. Lorem
                                                            ipsum dolor sit amet,
                                                        </Typography>
                                                    </Box>
                                                </div>
                                            </div>
                                            <div className="Ava-rate">
                                                <Rating
                                                    name="simple-controlled"
                                                    // value={data.rating}
                                                    readOnly
                                                />
                                            </div>
                                            <br />
                                        </div>
                                    </div>
                                </Paper>
                            </Box>
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
                                                    Your rating :{" "}
                                                    <Rating
                                                        name="simple-controlled"
                                                        // value={data.rating}
                                                        readOnly
                                                    />
                                                </p>
                                            </span>
                                        </div>
                                        <div>
                                            <p>Your review</p>
                                            <TextareaAutosize
                                                aria-label="minimum height"
                                                minRows={4}
                                                // placeholder="Minimum 3 rows"
                                                style={{ width: "100%" }}
                                            />
                                        </div>
                                        <div>
                                            <Box
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
                                            </Box>

                                            <Stack spacing={2} direction="row">
                                                <Button
                                                    variant="contained"
                                                    // disabled={disable}
                                                    className="btn-Log"
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
            </div>
        </div>
    );
};

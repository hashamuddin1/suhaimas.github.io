import React, { useState } from "react";
import Box from "@mui/material/Box";
// import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import { useInput } from '@mui/core';
// import { styled } from '@mui/system';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
// import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
// import FormHelperText from '@mui/material/FormHelperText';
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import "./Login.css";
import { Link } from "react-router-dom";
import { ListItemText } from "@mui/material";
import db from "../../database/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Store/Reducers/userReducer";
import { useHistory } from "react-router";

import under from "../../assets/register.png"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const Login = ({ userState }) => {
  const history = useHistory();
  const auth = getAuth();
  // console.log("auth", auth)
  // const [product, setProduct] = React.useState([]);
  const [userUid, setUserUid] = React.useState();
  // const [userState, setUserState] = React.useState();
  const [fData, setFdata] = React.useState([]);
  const dispatch = useDispatch();
  const udata = useSelector((state) => state.user.initialState);

  // const product = useSelector((state) => state.userGet.initialState);

  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [tvalue, setTvalue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setTvalue(newValue);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [textValue, textSetValue] = useState("Controlled");

  const handleTextValueChange = (event) => {
    textSetValue(event.target.value);
  };

  // React.useEffect(() => {
  //   const collectionProduct = collection(db, "userData");

  //   const unsub = onSnapshot(collectionProduct, (snapshot) => {
  //     const data = snapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setProduct(data);
  //   });

  //   return unsub;
  // }, []);
  const SignIn = () => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        //
        setUserUid(userCredential.user.uid);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorMessage);
      });
  };
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const uid = user.uid;
  //     if (product) {
  //       product.map((data) => {
  //         if (data.email == user.email) {
  //           dispatch(loginUser(data));
  //         }
  //       });
  //     }
  //     setUserState(true);
  //   } else {
  //     setUserState(false);
  //   }
  // });
  const Out = () => {
    signOut(auth)
      .then(() => {
        dispatch(loginUser([]));
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <>
      {userState == true ? (
        <>
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              // height: 224,
              // border: "1px solid"
            }}
          >
            <Box>
              <Tabs
                orientation="vertical"
                value={tvalue}
                onChange={handleChangeTab}
                aria-label="basic tabs example"
                style={{ marginTop: "35%" }}
              >
                <Tab label="My Profile" {...a11yProps(0)} />
                <Tab label="Track Order" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={tvalue} index={0}>
              <h1 className="head-pro">My Profile</h1>
              <div className="pro-div">
                {/* <div>
                  <h6>Verification Status</h6>
                  <p>{udata.Gender}</p>
                </div> */}
                <div className="pro-div-m1"
                // style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
                >

                  {/* <Card sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}> */}
                  <div>
                    <h6>Full Name</h6>
                    <p>{udata.fullname}</p>
                  </div>
                  <div>
                    <h6>Email Address</h6>
                    <p>{udata.email}</p>
                  </div>
                  <div>
                    <h6>Mobile</h6>
                    <p>{udata.phone}</p>
                  </div>
                </div>
                <div className="pro-div-m2">
                  <div>
                    <h6>Birthday</h6>
                    <p>{udata.date}</p>
                  </div>
                  <div>
                    <h6>Gender</h6>
                    <p>{udata.Gender}</p>
                  </div>
                  <div>
                    <h6>Verification Status</h6>
                    {getAuth().currentUser.emailVerified ?
                      <p style={{ color: "green", }}>Verified <VerifiedIcon sx={{ height: "20px", width: "20px" }} /></p>
                      :
                      <p style={{ color: "red" }}>Not Verified <NewReleasesIcon sx={{ height: "20px", width: "20px" }} /></p>
                    }

                  </div>
                </div>
                <div className="pro-div-btn">
                  {/* <Button size="small" onClick={() => Out()}>LogOut</Button> */}
                  <Stack >
                    <Button
                      onClick={() => Out()}
                      variant="contained"
                      className="btnLog-pro"
                    >
                      LogOut
                    </Button>
                  </Stack>
                </div>
                {/* <CardActions>
                  <Button size="small" onClick={() => Out()}>LogOut</Button>
                </CardActions> */}
                {/* <div></div>
                  <div></div>
                  <div></div> */}
                {/* <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                      be{bull}nev{bull}o{bull}lent
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      adjective
                    </Typography>
                    <Typography variant="body2">
                      well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions> */}
                {/* </Card> */}
                <div>
                  {/* //.............................................................................. */}
                  {/* <div>Name: {udata.fullname}</div>
                  <div>Email: {udata.email}</div>
                  <div>Date Of Birth: {udata.date}</div>
                  <div>Gender: {udata.Gender}</div>
                  <div>Contact NO: {udata.phone}</div> */}
                </div>
                {/* <Button onClick={() => Out()}>LogOut</Button> */}
              </div>
            </TabPanel>
            <TabPanel value={tvalue} index={1}>
              <h6>Coming Soon .........!!!!!!!</h6>
            </TabPanel>
          </Box>
        </>
      ) : (
        <div className="divLog">
          <div className="divHead">
            <h1>Welcome ! Please login</h1>
            <p>
              New member?
              <Link className="linkReg" to="/Register">
                Register
              </Link>{" "}
              here.
            </p>
          </div>
          <div
            // className="divForm"
            className="divForm-new"
          // style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}
          >
            {/* <Box>
              <Grid className="grid" container spacing={0} columns={12}>
                <Grid className="inputGrid" item xs={6}>
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": { m: 1, width: "30ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <TextField
                        id="standard-textarea"
                        label="Please enter your Number or Email"
                        variant="standard"
                        onChange={handleChange("email")}
                      />
                    </div>
                  </Box>
                  <Box>
                    <div>
                      <FormControl
                        sx={{ m: 1, width: "30ch" }}
                        variant="standard"
                      >
                        <InputLabel htmlFor="standard-adornment-password">
                          Please enter your Password
                        </InputLabel>
                        <Input
                          id="standard-adornment-password"
                          type={values.showPassword ? "text" : "password"}
                          value={values.password}
                          onChange={handleChange("password")}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {values.showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <Link className="linkpass" to="/ResetPassword">
                          Forget password?
                        </Link>
                      </FormControl>
                    </div>
                  </Box>
                </Grid>

                <Grid className="btnGrid" item xs={6}>
                  <Stack spacing={2} direction="row">
                    <Button
                      onClick={() => SignIn()}
                      variant="contained"
                      className="btnLog"
                    >
                      Login
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box> */}
            <div style={{ width: '25%' }} className='removeImg'>
              <img style={{ backgroundSize: 'contain', width: '100%' }} src={under} />
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
                <div>
                  <TextField
                    id="standard-textarea"
                    label="Please enter your Number or Email"
                    variant="outlined"
                    onChange={handleChange("email")}
                  />
                </div>
              </Box>
              <div>
                <FormControl
                  sx={{ m: 1, width: "30ch" }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    // id="standard-adornment-password"
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <Link className="linkpass" to="/ResetPassword">
                    Forget password?
                  </Link>
                  <div style={{ marginTop: '2%' }}>

                    <Stack spacing={2} direction="row">
                      <Button
                        onClick={() => SignIn()}
                        variant="contained"
                        className="btnLog"
                      // style={{ border: '1px solid' }}
                      >
                        Login
                      </Button>
                    </Stack>
                  </div>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

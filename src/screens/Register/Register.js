import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
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
// import { A700, orange } from '@mui/material/colors';
import "../Login/Login.css";
import "./Register.css";
import { Link } from "react-router-dom";
import { ListItemText } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import {
  getAuth, createUserWithEmailAndPassword,
  sendEmailVerification
  //  sendEmailVerification 
}
  from "firebase/auth";
import db from '../../database/firebase'
import {
  doc,
  setDoc,
  collection,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { useHistory } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// import { Formik, Form } from "formik";
// import { useField } from "formik";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../Store/Reducers/userReducer"



import under from "../../assets/register.png"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



export const Register = () => {
  const history = useHistory();
  const [disable, setDisable] = useState(true);
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(new Date());
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState([])
  const [values, setValues] = useState({
    email: "",
    password: "",
    phone: "",
    fullname: "",
    showPassword: false,
  });

  const [valuesError, setValuesError] = useState({})
  const [isSubmit, setIsSubmit] = useState(false);


  // useEffect(() => {
  //   console.log(valuesError);
  //   if (Object.keys(valuesError).length === 0 && isSubmit) {
  //     console.log("values", values);
  //   }
  // }, [valuesError]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.fullname) {
      errors.fullname = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.phone) {
      errors.phone = "Number is required!";
    }else if (!regex.test(values.email)) {
      errors.phone = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    }
    // else if (values.password.length > 10) {
    //   errors.password = "Password cannot exceed more than 10 characters";
    // }
    return errors;
  }

  const [open, setOpen] = React.useState(false);
  const [openl, setOpenl] = React.useState(false);
  const [err, setErr] = React.useState('');

  const dispatch = useDispatch()


  const SignUp = async (e) => {
    // e.preventDefault();
    setValuesError(validate(values));
    setIsSubmit(true);


    if (isSubmit) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in
          // console.log("user", userCredential)

          const user = userCredential.user;
          // console.log("userData",user);
          dispatch(loginUser(user))


          // ...
          // setDoc(doc(db, "userData", user.uid), {
          //   email: values.email,
          //   phone: values.phone,
          //   fullname: values.fullname,
          //   Gender: gender,
          //   date: dob.toLocaleDateString(),
          // })
          sendEmailVerification(auth.currentUser)
            .then((data) => {
              console.log("current user",data);


              setDoc(doc(db, "userData", user.uid), {
                email: values.email,
                password: values.password,
                phone: values.phone,
                fullname: values.fullname,
                Gender: gender,
                date: dob.toLocaleDateString(),
              })
              // ...
            })
            .then(setOpen(true))
            .then(setTimeout(() => {

              // history.go(0)
              history.push('/Login')
              // history.go(0)
            }, 2000)
            )
          // setData(user)
          // setTimeout(() => {

          //   // history.go(0)
          //   history.push('/Login')
          //   // history.go(0)
          // }, 2000)
        })
        // .then(
        //   setTimeout(() => {

        //     // history.go(0)
        //     history.push('/Login')
        //     // history.go(0)
        //   }, 2000)
        // )

        //   setTimeout(

        //     // history.go(0)
        //     history.push('/Login')

        //     // history.go(0)
        //     , 2000)
        // )
        // .then(
        //   setInterval(() => { history.go(0) }, 12000)
        // )
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErr('Email Already In Use')
          setTimeout(() => {
            setOpenl(true)
          }, 300)
          // console.log("errorMessage", errorMessage)
          // console.log("errorCode", errorCode)
          // console.log("error", error)
        });
    }
  };
  // console.log(data.uid)





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



  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };



  const handleChangeChecked = (event) => {
    setChecked(event.target.checked);
    setDisable(false);
  };



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



  // const [field, meta] = useField(values.email);

  // const { errors, register } = useForm();
  // console.log(errors)
  return (
    // <Formik initialValues={{
    //   // email: values.email,
    //   // password: values.password,
    //   // phone: values.phone,
    //   // fullname: values.fullname,
    //   email: "",
    //   password: "",
    //   phone: "",
    //   fullname: "",
    // }} >
    //   {Formik => (
    <div
    // onSubmit={SignUp
    >
      {/* {Object.keys(valuesError).length === 0 && isSubmit ? setOpen(true) : setOpen(true)


      } */}
      <div className="divLog">
        {/* {console.log(Formik.values)} */}
        <div className="divHead">
          <h1>Create your Account</h1>
          <p>
            Already member?
            <Link className="linkReg" to="/Login">
              Login
            </Link>{" "}
            here.
          </p>
        </div>
        <div
          // className="divForm"
          className="divForm-new"
        // style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}

        >
          {/* <Form> */}


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
                  <div
                  >
                    <TextField
                      id="standard-textarea"
                      name="fullname"
                      label="Please enter first and last name"
                      variant="standard"
                      onChange={handleChange("fullname")}

                    />
                  </div>
                  <p className="Errors">{valuesError.fullname}</p>
                  <div>
                    <TextField
                      id="standard-textarea"
                      label="Please enter your Email"
                      variant="standard"
                      onChange={handleChange("email")}
                    />
                  </div>
                  <p className="Errors">{valuesError.email}</p>
                  <div>
                    <TextField
                      id="standard-number"
                      label="Number"
                      type="number"
                      variant="standard"
                      onChange={handleChange("phone")}
                    />
                  </div>
                  <p className="Errors">{valuesError.phone}</p>
                </Box>
                <Box>
                  <div>
                    <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
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
                    </FormControl>
                  </div>
                  <p className="Errors">{valuesError.password}</p>
                  <br />
                  <div className="datePick">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        views={["day", "month", "year"]}
                        label="Birthday"
                        value={dob}
                        onChange={(newValue) => {
                          setDob(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} helperText={null} />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                  
                </Box>
              </Grid>
              <Grid className="btnGrid" item xs={6}>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "30ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div
                    
                    className="emailGrid-Div"
                  >
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Gender
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={gender}
                        onChange={handleChangeGender}
                        label="Gender"
                      >
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  
                  <div className="divCheck">
                    <Checkbox
                      checked={checked}
                      onChange={handleChangeChecked}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                    <span className="checkSpan">
                      I want to receive exclusive offers and promotions from
                      Jaymart.
                    </span>
                  </div>
                </Box>

                <Stack spacing={2} direction="row">
                  <Button
                    variant="contained"
                    disabled={disable}
                    className="btnLog"
                    onClick={() => SignUp()}
                  >
                    SIGN UP
                  </Button>
                </Stack>
                <p className="signPera">
                  By clicking “SIGN UP”, I agree to Jaymart's Terms of Use and
                  Privacy Policy
                </p>
              </Grid>
            </Grid>
          </Box> */}


          <div style={{ width: '25%' }} className='removeImg'>
            <img style={{
              backgroundSize: 'contain',
              width: '100%'
            }} src={under} />
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
              <div
              >
                <TextField
                  id="standard-textarea"
                  name="fullname"
                  label="Please enter first and last name"
                  variant="outlined"
                  onChange={handleChange("fullname")}

                />
              </div>
              <p className="Errors">{valuesError.fullname}</p>
              <div>
                <TextField
                  id="standard-textarea"
                  label="Please enter your Email"
                  variant="outlined"
                  onChange={handleChange("email")}
                />
              </div>
              <p className="Errors">{valuesError.email}</p>
              <div>
                <TextField
                  id="standard-number"
                  label="Number"
                  type="number"
                  variant="outlined"
                  onChange={handleChange("phone")}
                />
              </div>
              <p className="Errors">{valuesError.phone}</p>
            </Box>
            <Box>
              <div>
                <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    variant="outlined"
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
                </FormControl>
              </div>
              <p className="Errors">{valuesError.password}</p>
              <br />
              <div
              // className="datePick"
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={["day", "month", "year"]}
                    label="Birthday"
                    value={dob}
                    onChange={(newValue) => {
                      setDob(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} helperText={null} />
                    )}
                  />
                </LocalizationProvider>
              </div>

            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "30ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div

              // className="emailGrid-Div"
              >
                <FormControl variant="outlined" sx={{ m: 1, width: "30ch" }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Gender
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={gender}
                    onChange={handleChangeGender}
                    label="Gender"
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div
              // className="divCheck"
              >
                <Checkbox
                  checked={checked}
                  onChange={handleChangeChecked}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <span className="checkSpan">
                  I am agree of all terms & conditions.
                </span>
              </div>
            </Box>

            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                disabled={disable}
                className="btnLog"
                onClick={() => SignUp()}
              >
                SIGN UP
              </Button>
            </Stack>
            <p className="signPera">
              By clicking “SIGN UP”, I agree to Terms of Use and
              Privacy Policy
            </p>

          </div>


          {/* </Form> */}
        </div>
        <Stack spacing={2} sx={{ width: '100%' }}>
          {/* <Button variant="outlined" onClick={handleClick}>
                      Open success snackbar
                    </Button> */}
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Registered Successfully!
            </Alert>
          </Snackbar>
          <Snackbar open={openl} autoHideDuration={3000} onClose={handleClosel}>
            <Alert onClose={handleClosel} severity="error" sx={{ width: '100%' }}>
              {err}
            </Alert>
          </Snackbar>
          {/* <Alert severity="error">This is an error message!</Alert>
                    <Alert severity="warning">This is a warning message!</Alert>
                    <Alert severity="info">This is an information message!</Alert>
                  <Alert severity="success">This is a success message!</Alert> */}
        </Stack>

      </div>
      {/* // </Formik> */}
      {/* //   )} */}
    </div>
  );
};

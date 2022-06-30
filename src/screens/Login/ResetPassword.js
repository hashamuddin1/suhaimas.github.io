import React, { useState } from 'react'
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ResetPassword = () => {
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [email, setEmail] = useState('');


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };

    const reset = () => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setOpen(true)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log('errorCode', errorCode)
                // console.log('errorMessage', errorMessage)
                // ..
                setOpen1(true)
            });
    }
    return (
        <div style={{ textAlign: 'center', width: "350px", margin: '30px auto' }}>
            <div >
                <h1>Password Reset</h1>
            </div>
            {/* <div > */}
            {/* <h5>Enter Email to reset password</h5> */}
            {/* </div> */}
            <div style={{ marginTop: '5%', marginBottom: '5%' }}>
                <Box
                    component="form"
                    sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                    }}
                // noValidate
                // autoComplete="off"
                >
                    <TextField
                        id="standard-textarea"
                        label="Please enter your Email"
                        variant="standard"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Box>
            </div>
            <div >
                <Stack
                    style={{ marginLeft: '30%', }}
                    // spacing={2}
                    direction="row"
                >
                    <Button variant="contained" className="btnLog-2"
                        onClick={() => reset()}
                    >
                        Reset
                    </Button>
                </Stack>
            </div>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Password Reset Successfully!<br />Please Check Email ...
                </Alert>
            </Snackbar>
            <Snackbar open={open1} autoHideDuration={2000} onClose={handleClose1}>
                <Alert onClose={handleClose1} severity="error" sx={{ width: '100%' }}>
                    Not A User ...!!
                </Alert>
            </Snackbar>
        </div>
    )
}



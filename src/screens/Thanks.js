import React from 'react'
import under from "../assets/logo.png"
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export const Thanks = () => {
    const location = useLocation();
    const history = useHistory();

    // console.log("location>", location.state)
    return (
        <div>
            <div style={{ textAlign: 'center', width: "350px", margin: '30px auto' }}>

                <img style={{ backgroundSize: 'contain' }} src={under} />
                {location.state ?
                    <>
                        <h1>Thanks For Shopping</h1>
                        <h3>Your Order ID : {location.state} </h3>
                    </>
                    :
                    null
                }
                <div >
                    <Stack style={{ marginLeft: '25%' }} spacing={2} direction="row">
                        <Button variant="contained" className="btnLog-2" onClick={() => history.push("/")}>
                            Go To Home
                        </Button>
                    </Stack>
                </div>
            </div>
        </div>
    )
}

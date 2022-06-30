import React from 'react'
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";

export const PageNotFound = () => {
    const history = useHistory();

    return (
        <div style={{ textAlign: 'center', width: "350px", margin: '30px auto' }}>
            <div >
                <h1>Page Not Found</h1>
            </div>
            <div style={{ marginTop: '5%', marginBottom: '5%' }}>
                <h4>Error 404</h4>
            </div>
            <div >
                <Stack style={{ marginLeft: '25%' }} spacing={2} direction="row">
                    <Button variant="contained" className="btnLog-2" onClick={() => history.push("/")}>
                        Go To Home
                    </Button>
                </Stack>
            </div>
        </div>
    )
}

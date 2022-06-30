import React from "react";
import "../flashsale/sale.css";
import "../bestimesale/bestime.css";
import logo from "../../assets/logo.png";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Facebook";
import { Twitter } from "@mui/icons-material";
import AddShoppingCartIcon from "@mui/icons-material/Instagram";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import './footer.css'

// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';


export default function Footer() {
  return (
    // <Box
    //   sx={{
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     '& > :not(style)': {
    //       m: 1,
    //       width: 128,
    //       height: 128,
    //     },
    //   }}
    // >
    //   <Paper elevation={0} >

    <div className="containerfoot"
    style={{ }}
    >
      <div className="container-foot">
        <div className="container-foot-div">
          <img width='100%' src={logo} alt="logo" />
          <Stack direction="row" spacing={1}>
            <IconButton aria-label="delete" color="primary">
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="delete" color="info">
              <Twitter />
            </IconButton>
            <IconButton color="secondary" aria-label="add to shopping cart">
              <AddShoppingCartIcon />
            </IconButton>
          </Stack>
        </div>
        <div className='flink'>
          <h1>Quick links</h1>
          <ListItemButton>
            <ListItemText
              primaryTypographyProps={{
                width: "100%",
                lineHeight: "10px",
              }}
              primary="Policy"
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemText
              primaryTypographyProps={{
                width: "100%",
                lineHeight: "10px",
              }}
              primary="Term & Condition"
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemText
              primaryTypographyProps={{
                width: "100%",
                lineHeight: "10px",
              }}
              primary="Shipping"
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemText
              primaryTypographyProps={{
                width: "100%",
                lineHeight: "10px",
              }}
              primary="Return"
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemText
              primaryTypographyProps={{
                width: "100%",
                lineHeight: "10px",
              }}
              primary="FAQs"
            />
          </ListItemButton>

        </div>
        <div className='flink'>
          <h1>Company</h1>
          <ListItemButton>
            <ListItemText
              primaryTypographyProps={{
                width: "100%",
                lineHeight: "10px",
              }}
              primary="About Us"
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemText
              primaryTypographyProps={{
                width: "100%",
                lineHeight: "10px",
              }}
              primary="Affilate"
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemText
              primaryTypographyProps={{
                width: "100%",
                lineHeight: "10px",
              }}
              primary="Career"
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemText
              primaryTypographyProps={{
                width: "100%",
                lineHeight: "10px",
              }}
              primary="Contact"
            />
          </ListItemButton>
        </div>
        <div className='flink'>
          <h1>Business</h1>
          <ListItemButton>
            <ListItemText
              primaryTypographyProps={{
                width: "100%",
                lineHeight: "10px",
              }}
              primary="Our Press"
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemText
              primaryTypographyProps={{
                width: "100%",
                lineHeight: "10px",
              }}
              primary="Checkout"
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemText
              primaryTypographyProps={{
                width: "100%",
                lineHeight: "10px",
              }}
              primary="My account"
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemText
              primaryTypographyProps={{
                width: "100%",
                lineHeight: "10px",
              }}
              primary="Shop"
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemText
              primaryTypographyProps={{
                width: "100%",
                lineHeight: "10px",
              }}
              primary="Working Hours 9am to 5pm"
            />
          </ListItemButton>
        </div>
      </div>
      <Divider />
      {/* <h4>©Copyright Jaymart.pk 2021 . All Rights Reserved</h4> */}
      <h4>© 2022 DeskWorkSolution. All Rights Reserved</h4>
    </div>
    //     {/* </Paper> */ }
    // {/* <Paper /> */ }
    // {/* <Paper elevation={3} /> */ }
    // {/* </Box> */ }
  );
}

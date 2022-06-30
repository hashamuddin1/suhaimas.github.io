import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import Container from "react-bootstrap/Container";

import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';


// import jay from "../assets/jay.png";
// import logo from "../assets/logo1.png";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import AddShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import Account from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import "./appbar.css";
import { useHistory } from "react-router";

import { useSelector } from "react-redux";
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
import db from "../database/firebase";

import logo from "../assets/logo.png";
import { ShopByCategory } from "./ShopByCategory/ShopByCategory"
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Button from '@mui/material/Button';

const style = {
  position: "absolute",
  top: "250px",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles({
  root: {
    // backgroundColor: 'black !important',
    // width: "120vw",
    width: "100%",
    // border: "1px solid green"
    // alignSelf: "center",
  },
  btn: {
    backgroundcolor: "white !imoprtant",
  },
  search: {
    // marginRight: '32% !important',
    // marginLeft: '15% !important',
    border: "1px solid #e7e3e3",
    backgroundColor: '#f5f5f5',
    // color: "#D3D3D3",
    // width: "100%",
    ["@media (max-width:700px)"]: {
      display: "none!important",
      // display: 'flex !important',
      // width: '100% !important',
      // flexDirection: 'row !important'

    },
  },
  searchA: {
    // marginRight: '32% !important',
    // marginLeft: '15% !important',
    // border: "1px solid",
    // color: "#D3D3D3",
    // width: "100%",
    ["@media (max-width:700px)"]: {
      display: "none!important",
    },
  },
  searchIcon: {
    // position: "absolute",
    display: "flex",
    justifyContent: "center",
    // borderRadius: "0 !important",
    // border: "1px solid black !important",
    background: "#FFA500 !important",
    color: "white !important",
    borderRadius: "50% !important",
    marginRight: "2.5% !important",
    // border: '1px solid black !important',
  },

  searchMobile: {
    // marginRight: '32% !important',
    // marginLeft: '15% !important',
    // border: "1px solid",
    // color: "#D3D3D3",
    // width: "100%",
    display: "none!important",
    ["@media (max-width:700px)"]: {
      display: "inline !important",
      width: "100% !important",
      // height: "10px !important",
      // border: "1px solid",
      // marginTop: "5% !important",
      // marginBottom: "5% !important",
      padding: '10px 10px'
    },
  },
  SearchiconMobile: {
    // position: "absolute",
    // display: "flex",
    // justifyContent: "center",
    // borderRadius: "0 !important",
    // border: '1px solid black !important',
    // marginRight: "2.5% !important",
    // background: "#FFA500 !important",
    // color: "white !important",
  },
  Searchicon: {
    // position: "absolute",
    // display: "flex",
    justifyContent: "center",
    borderRadius: "0 !important",
    // border: '1px solid black !important',
    // marginRight: "2.5% !important",
    background: "black !important",
    color: "white !important",
  },
  nonLinks: {
    color: "black",
    textDecoration: "none",
    cursor: "pointer",
  },
  imglogo: {
    width: "15%",
    ["@media (max-width:700px)"]: {
      // justifyContent: "space-between",
      // marginLeft: "0px",
      width: "50%",
    },
    // height: "20% !important",
    // border: "1px solid "
  },
  // imgDiv: {
  //   border: "1px solid ",
  //   width: "15%",
  // },
  flexNavbar: {
    display: "flex",
    justifyContent: "space-around",

    // border: "1px solid ",
    marginLeft: "-40px",
    ["@media (max-width:700px)"]: {
      justifyContent: "space-between",
      marginLeft: "0px",
    },
  },
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  // borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  //   marginRight: "24% !important",
  //   marginLeft: "20% !important",
  width: "100%",
  height: "10% ! important",
  // border: "2px solid",
  // color: "yellow",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  // marginTop: "10px",
  // ["@media (max-width:910px)"]: {
  //   width: "90%",
  // }
  // "&.searchInput": {
  //     ["@media (max-width:700px)"]: {
  //       width: "80%!important",
  //     },
  //     ["@media (max-width:610px)"]: {
  //       width: "70%!important",
  //     },
  //   },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  // position: 'absolute',
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // border: "1px solid black",
  // color: "red",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  // color: "inherit",
  // width: "85%",
  // border: "10px solid black",
  ["@media (max-width:910px)"]: {
    // width: "75%",
  },
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // border: "1px solid black",
    // color: "yellow",
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing()})`,
    transition: theme.transitions.create("width"),
    // width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
    // ["@media (max-width:700px)"]: {
    //   paddingLeft: 0,
    //   width: "150px",
    // },
  },
}));


export default function MenuAppBar({ setItemSearch, cartCount }) {

  // const [cartCount, setCartCount] = useState([]);


  // const udata = useSelector((state) => state.user.initialState);
  // useEffect(async () => {
  //   const collectionRef = collection(db, `${udata.id}`);
  //   const q = query(collectionRef);

  //   const unsub = onSnapshot(q, (snapshot) => {
  //     const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //     setCartCount(data);
  //   });

  //   return unsub;

  // }, []);

  // console.log("CART>>>>>", cartCount)

  const [openList, setOpenList] = React.useState(true);

  const handleClick = () => {
    setOpenList(!openList);
  };

  const history = useHistory();

  const classes = useStyles();



  // const dataPush = (setCartCount) => {
  //   history.push({
  //     pathname: "/AddToCart",
  //     state: setCartCount(),
  //   });
  // };



  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  // const [itemSearch, setItemSearch] = useState("");
  // const [searchModel, setSearchModel] = useState(false);
  // const [product, setProduct] = useState([]);
  // console.log("search..>", product.filter((x) => {
  //   if (itemSearch == "") {
  //     return x
  //   } else if (x.name.toLowerCase().includes(itemSearch.toLocaleLowerCase())) {
  //     return x
  //   }
  // }));
  // useEffect(async () => {
  //   const collectionRef = collection(db, "product");

  //   // const q = query(collectionRef, where("description", "==", 'Media'));

  //   // const querySnapshot = await getDocs(q);
  //   // querySnapshot.forEach((doc) => {
  //   //   // doc.data() is never undefined for query doc snapshots
  //   //   console.log(doc.id, " => ", doc.data());
  //   // });

  //   const unsub = onSnapshot(collectionRef, (snapshot) => {
  //     const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //     setProduct(data);
  //   });

  //   return unsub;
  // }, []);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const list = () => {
    const links = [
      "/",
      "/newArrival",
      "/bestSale",
      // '/Categories',
      // "/flashSale",
      // "/about",
      // "/contact",
    ];
    return (
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {/* <ListItem onClick={() => setModelOpen(true)}>
            <IconButton className={classes.searchIcon}>
              <SearchIcon />
            </IconButton>
            <ListItemText primary="Search" className={classes.nonLinks} />
          </ListItem> */}
          <ListItem style={{ backgroundColor: '#FFA500' }} onClick={() => history.push("/Login")}>
            <IconButton className={classes.searchIcon}>
              <Account />
            </IconButton>
            <ListItemText style={{ color: 'white' }} primary="Profile" className={classes.nonLinks} />
          </ListItem>
          <List
            sx={{ width: '100%', Width: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          // subheader={
          //   <ListSubheader component="div" id="nested-list-subheader">
          //     Shop By Category
          //   </ListSubheader>
          // }
          >


            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Shop By Category" />
              {openList ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openList} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {/* <ListItemButton sx={{ pl: 4 }}> */}
                {/* <ListItemText primary="Starred" /> */}
                <ListItemText>
                  <ShopByCategory />
                </ListItemText>
                {/* </ListItemButton> */}
              </List>
            </Collapse>
          </List>
          {[
            "Home",
            "New Arrivals",
            "Best Sale Item",
            // 'Shop By Category',
            // "Flash Sale",
            // "About",
            // "Contact",
          ].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText>
                <Link to={links[index]} className={classes.nonLinks}>
                  {text}
                </Link>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  const [value,setValue]=useState('')
  return (
    <Box sx={{ height:"75px" }}>
      <AppBar color="default" className={classes.root} position="fixed">
        <Container className="container">
          <Toolbar className={classes.flexNavbar}>
            <MenuIcon id="none" onClick={toggleDrawer(true)} />
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {list()}
            </Drawer>
            <img src={logo} onClick={() => history.push('/')} style={{ cursor: 'pointer' }} className={classes.imglogo} alt="logo" />

            {/* <Modal
              open={modelOpen}
              onClose={() => setModelOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Search
                </Typography>
                <Search className="searchInput">
                  <StyledInputBase
                    placeholder="Search in JayMart"
                    inputProps={{ "aria-label": "search" }}
                    onChange={(e) => setItemSearch(e.target.value)}
                  />
                  <IconButton onClick={() => history.push('/search')}
                    className={classes.searchIcon}>
                    <SearchIcon />
                  </IconButton>
                </Search>
              </Box>
            </Modal> */}
            {/* <Modal open={searchModel} onClose={() => setSearchModel(false)}>
              <Box sx={style}>
                <Search>
                  <StyledInputBase
                    placeholder="Search in JayMart"
                    inputProps={{ "aria-label": "search" }}
                    onChange={(e) => setItemSearch(e.target.value)}
                  />
                  <IconButton className={classes.searchIcon}>
                    <SearchIcon />
                  </IconButton>
                </Search>
              </Box>
            </Modal> */}
            <Search
              className={classes.search}
            // onClick={() => setSearchModel(true)}
            >
              <StyledInputBase
                placeholder="Search Here"
                inputProps={{ "aria-label": "search" }}
                style={{ height: 0 }}
                onChange={(e) => setValue(e.target.value)}
              />
              <IconButton onClick={() => {
                setItemSearch(value)
                history.push('/search')
              }}
              style={{ background:'black' }}
                className={classes.Searchicon}
              >
                <SearchIcon />
              </IconButton>
            </Search>
            <div className="gbtn">
              <IconButton
                aria-label="add to shopping cart"
                onClick={() => history.push("/AddToCart")}
              >
                <AddShoppingCartIcon />
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>{cartCount.length == 0 ? "" : cartCount.length}</span>
              </IconButton>
              <IconButton
                aria-label="add to shopping cart"
                className={classes.searchA}
                onClick={() => history.push("/Login")}
              >
                <PermIdentityIcon sx={{ height: "30px", width: "30px" }} />
                {/* <Account /> */}
              </IconButton>
            </div>
          </Toolbar>
          <Search
            className={classes.searchMobile}
          // onClick={() => setSearchModel(true)}
          >
            <StyledInputBase
              placeholder="Search Here ..."
              inputProps={{ "aria-label": "search" }}
              style={{ width: '100% !important', padding: '10x 10px !important', fontSize: '18px', margin: '2% 8%' }}
              onChange={(e) => setItemSearch(e.target.value)}
            />
            <IconButton onClick={() => history.push('/search')}
              className={classes.SearchiconMobile}
            >
              <SearchIcon />
            </IconButton>
          </Search>
        </Container>
      </AppBar>
    </Box>
  );
}

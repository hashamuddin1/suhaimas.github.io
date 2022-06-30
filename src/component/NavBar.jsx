import React, { useState } from 'react';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
  List,
  ListItemText
} from '@mui/material';

import './appbar.css'
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingBasketOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useStyles } from './NavBarStyle';
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom'
import { ShopByCategory } from "./ShopByCategory/ShopByCategory"
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
// import Typography from '@mui/material/Typography';

export default function NavBar({ history }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [navOpen, setNavOpen] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 1 new notifications" color="inherit">
          <Badge badgeContent={1} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  const handleNavbar = () => {
    setNavOpen(!navOpen);
  }

  const closeOnMobileMenu = () => {
    setNavOpen(false);
  }



  const [anchorE, setAnchorE] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorE(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorE(null);
  };

  const open = Boolean(anchorE);


  const location = useLocation();
  // console.log("his>>", location)


  const getColor = (curr) => {
    if (location.pathname === curr) {
      return 'underline'
    }
  }


  return (
    <div className={classes.grow}>
      <AppBar className='nav' position="static">
        <Toolbar style={{
          paddingInlineStart: '50px',
          marginLeft: '1%',
        }}>
          {/* <IconButton
              edge="center"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon
                onClick={handleNavbar}
              />
            </IconButton> */}
          <Typography className={classes.title} sx={{ flexGrow: 0.1 }} noWrap>
            <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
                <div>
                  <Button className="NavBtn" variant="contained" {...bindTrigger(popupState)}>
                    Shop By Category
                  </Button>
                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: 'bottom',
    
                      // horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      // horizontal: 'center',
                    }}
                  >
                    <Typography sx={{ p: 1 }}><ShopByCategory /></Typography>
                  </Popover>
                </div>
              )}
            </PopupState>


            {/* .................................. */}


            {/* <div>
              <Typography
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              >
                Shop By Category
              </Typography>
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: 'none',
                }}
                open={open}
                anchorE={anchorE}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography sx={{ p: 1 }}>

                  <ShopByCategory />
                </Typography>
              </Popover>
            </div> */}
          </Typography>
          <div>
            <List
              className={`${navOpen ? `${classes.listItemsActive}` : `${classes.listItems}`}`}
            >
              <ListItemText className={classes.listItem} onClick={closeOnMobileMenu}>
                <Link to="/" style={{ textDecoration: getColor('/') }} className={classes.listItemLink}>
                  <Typography className={classes.linkText}>Home</Typography>
                </Link>
              </ListItemText>
              <ListItemText className={classes.listItem} onClick={closeOnMobileMenu}>
                <Link to="/newArrival" style={{ textDecoration: getColor('/newArrival') }} className={classes.listItemLink}>
                  <Typography className={classes.linkText}>New Arrival's</Typography>
                </Link>
              </ListItemText>
              <ListItemText className={classes.listItem} onClick={closeOnMobileMenu}>
                <Link to="/bestSale" style={{ textDecoration: getColor('/bestSale') }} className={classes.listItemLink}>
                  <Typography className={classes.linkText}>Best Sale Item</Typography>
                </Link>
              </ListItemText>
              {/* <ListItemText className={classes.listItem} onClick={closeOnMobileMenu}>
                <Link to="/flashSale" style={{ textDecoration: getColor('/flashSale') }} className={classes.listItemLink}>
                  <Typography className={classes.linkText}>Flash Sale</Typography>
                </Link>
              </ListItemText> */}
            </List>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

            {/* <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            > */}
            {/* <ListItemText className={classes.listItem} onClick={closeOnMobileMenu}>
                <Link to="/contact" className={classes.listItemLink}>
                  <ListItemText className={classes.linkText}>About</ListItemText>
                </Link>
              </ListItemText>
              <ListItemText className={classes.listItem} onClick={closeOnMobileMenu}>
                <Link to="/contact" className={classes.listItemLink}>
                  <ListItemText className={classes.linkText}>Contact</ListItemText>
                </Link>
              </ListItemText>
            </IconButton> */}

          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div >
  );
}
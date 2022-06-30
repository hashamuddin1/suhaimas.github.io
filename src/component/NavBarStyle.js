import { fade, makeStyles } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { color } from '@mui/system';

export const useStyles = makeStyles((theme) => ({

    grow: {
        flexGrow: 0.8,
        // height: '10vh',
        marginTop: '-1%',
        // width:'90%',
        // paddingLeft:'10%',
        // border:'1px solid',
        ["@media (max-width:700px)"]: {
            display: "none",
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
            color: 'white',


        },
    },
    title: {
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            color: 'white',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },

    listItems: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,


        // ['@media (max-width: 600px)']: {
        //     backgroundColor: 'lightblue',
        //     // display: 'block',
        //     display: 'flex',
        //     flexDirection: 'column',
        //     height: '87.5vh',
        //     position: 'fixed',
        //     top: '10vh',
        //     width: '100%',
        //     left: 0,
        //     transform: 'translateY(100%)',
        //     transition: 'all 0.5s ease-in-out',
        //     zIndex: "10!important",
        // }
    },
    listItem: {
        margin: '0px 15px',
        // '&:hover': {
        //     backgroundColor: "#FFA500",
        //     // boxShadow: "inset 0px 0px 10px #FFA500",
        //     // borderRadius: "45px",
        //     padding: "0px 0px",
        //     // margin: '0px 15px',
        //     // color: "#FFA500",
        //     // color: "red !important"
        // },
        // '&:focus': {
        //     backgroundColor: "#FFFF00",
        //     color: "#FFC0CB",
        // }

        // ['@media (max-width: 600px)']: {
        //     margin: '0px',
        //     width: '100%',
        //     display: 'flex',
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     fontSize: '30px',
        // }
    },
    listItemLink: {
        textDecoration: 'none',
        color: 'white',
        // position: 'relative',
        // zIndex: '1',
        // '&:hover': {
        //     color: '#91640F',
        // },
        // '&:active': {
        //     color: '#91640F',
        // },
        // '&:after': {
        //     display: 'block',
        //     position: 'absolute',
        //     top: '0',
        //     left: '0',
        //     bottom: '0',
        //     right: '0',
        //     margin: 'auto',
        //     width: '100%',
        //     height: '1px',
        //     content: '.',
        //     color: 'transparent',
        //     background: '#F1C40F',
        //     visibility: 'none',
        //     opacity: '0',
        //     zIndex: '-1',
        // },
        // '&:hover:after': {
        //     opacity: '1',
        //     visibility: 'visible',
        //     height: '100%',
        // }

    },
    // listItemLink.active: {

    // },

    linkText: {
        // '&:hover': {
        fontWeight: 'bold !important',
        //     // boxShadow: "inset 0px 0px 0px #FFA500",
        //     // borderRadius: "45px",
        //     // padding: "2px 4px",
        //     // color: "#FFA500",
        //     // fontWeight: "600 !important",
        //     // color: "red !important"
        // },
        // '&:focus': {
        //     backgroundColor: "#FFFF00",
        //     color: "#FFC0CB",
        // }
        // ['@media (max-width: 600px)']: {
        //     fontSize: '30px',
        //     color: 'black',
        //     fontWeight: 'bold',
        //     padding: '15px',
        //     width: '100vw',
        //     display: 'flex',
        //     justifyContent: 'center',
        //     alignItems: 'center',

        // }
    },
    listItemsActive: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        // '&:hover': {
        //     backgroundColor: "#FFA500",
        //     // boxShadow: "inset 0px 0px 10px #FFA500",
        //     // borderRadius: "45px",
        //     padding: "0px 0px",
        //     // color: "#FFA500",
        //     // color: "red !important"
        // },

        // ['@media (max-width: 600px)']: {
        //     backgroundColor: 'lightblue',
        //     // display: 'block',
        //     display: 'flex',
        //     flexDirection: 'column',
        //     height: '87.5vh',
        //     position: 'fixed',
        //     top: '9vh',
        //     width: '100%',
        //     left: 0,
        //     transform: 'translateY(0)',
        //     transition: 'all 0.5s ease-in-out',
        //     zIndex: "10!important",
        // }
    },
}));
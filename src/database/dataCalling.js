// import { useEffect } from "react";
// // // import "./bestime.css";
// // // import "../flashsale/sale.css";
// // // import Divider from "@mui/material/Divider";
// // // import Rating from "@mui/material/Rating";
// // // import Button from "@mui/material/Button";
// // // import List from "@mui/material/List";
// // // import ListItemText from "@mui/material/ListItemText";
// // // import ListItemButton from "@mui/material/ListItemButton";
// import {
//     onSnapshot,
//     collection,
//     limit,
//     orderBy,
//     query,
// } from "firebase/firestore";
// import db from "./firebase";
// // // import Card from '@mui/material/Card';
// // // import { useHistory } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { productData } from "../Store/Reducers/productReducer";
// import { categoryData } from "../Store/Reducers/mainCategoryReducer";


// const dataCalling = () => {

//     const dispatch = useDispatch();
//     useEffect(async () => {
//         const collectionRef = collection(db, "product");
//         const q = query(collectionRef, orderBy("name", "desc")
//             // , limit(40)
//         );

//         const unsub = onSnapshot(q, (snapshot) => {
//             const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//             // setBestSale(data);
//             dispatch(productData(data))
//         });

//         return unsub;
//     }, []);


//     // useEffect(async () => {
//     //     const collectionProduct = collection(db, "MainCategory");

//     //     const unsub = onSnapshot(collectionProduct, (snapshot) => {
//     //         const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//     //         // setProduct(data);
//     //         dispatch(categoryData(data))
//     //     });

//     //     return unsub;
//     // }, []);
// }

// export {
//     dataCalling,
// }
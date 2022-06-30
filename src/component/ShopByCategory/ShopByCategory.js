import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
// import "./ShopByCategory.css"
import {
    onSnapshot,
    collection,
    limit,
    orderBy,
    query,
} from "firebase/firestore";
import db from "../../database/firebase";
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux";


export const ShopByCategory = () => {
    const history = useHistory()
    // const [product, setProduct] = React.useState([]);

    // const [product, setProduct] = React.useState([]);

    const categoryD = useSelector((state) => state.category.initialState);
    // const history = useHistory();
    // const [bestSale, setBestSale] = useState([]);
    // const [data, setData] = React.useState([]);
    // useEffect(async () => {
    //     const collectionRef = collection(db, "product");
    //     const q = query(collectionRef, orderBy("name", "desc"), limit(8));

    //     const unsub = onSnapshot(q, (snapshot) => {
    //         const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //         setBestSale(data);
    //     });

    //     return unsub;
    // }, []);

    // useEffect(() => {
    //     const collectionProduct = collection(db, "MainCategory");

    //     const unsub = onSnapshot(collectionProduct, (snapshot) => {
    //         const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //         setProduct(data);
    //     });

    //     return unsub;
    // }, []);

    // const submit = (category) => {
    //     setData(bestSale.filter(x => x.category === category))
    // }

    // console.log(data)


    const submit = (data) => {
        // console.log('main data', data)
        history.push({
            pathname: '/Categories',
            // search: '?query=abc',
            state: { detail: data }
        });
        // history.push("/ProductDetail", data)
    }


    return (
        <div className="Category-main">
            {/* <ul className="Category-main-ul">
                <li className="Category-main-li">Clothing & Apparel</li>
                <li className="Category-main-li">Garden & Kitchen</li>
                <li className="Category-main-li">Health & Beauty</li>
                <li className="Category-main-li">Computer & Technologies</li>
            </ul> */}
            <List className="Category-main-ul">
                {/* <h1>CATEGORIES</h1> */}
                {categoryD.map((data) => (
                    <ListItemButton onClick={() => submit(data)}>
                        <ListItemText
                            // className="Category-main-li"
                            primaryTypographyProps={{
                                width: "100%",
                                lineHeight: "10px",
                                fontSize: "12px",
                                color:"black",
                            }}
                            primary={data.category}
                        />
                    </ListItemButton>
                ))}
            </List>
        </div>
    )
}

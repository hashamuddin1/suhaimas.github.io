import React, { useState, useEffect } from 'react';
import './App.css';
// import './component/footer/footer.css'
// import './component/flashsale/sale.css'
// import './component/bestimesale/bestime.css'
import {
  Route,
  // HashRouter as Router,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import MenuAppBar from './component/AppBar';
import NavBar from './component/NavBar';
// import Silder from './component/Silder/Silder';
import Home from './screens/Home/Home';
import NewArrival from './screens/NewArrival/NewArrival';
import CheckArrival from './screens/CheckArrival/CheckArrival';
import BestSaleItem from './screens/BestSaleItem/BestSaleItem';
import Categories from './screens/Categories/Categories';
import FlashSale from './screens/FlashSale/FlashSale';
// import Recommendeditems from './screens/Recommendeditems/Recommendeditems';
import { Login } from './screens/Login/Login';
import { Register } from './screens/Register/Register';
import { AddToCart } from './screens/AddToCart/AddToCart';
import { ProductDetail } from './component/ProductDetail/ProductDetail';
import { FlashProductDetail } from './component/ProductDetail/FlashProductDetail';
import { Search } from './screens/Search/Search';
import Footer from "./component/footer/Footer"
import Payment from './component/Payment/Payment'
import { PageNotFound } from "./screens/PageNotFound";
import CheckOut from "./screens/CheckOut/CheckOut";
import { ResetPassword } from "./screens/Login/ResetPassword"
import { Thanks } from "./screens/Thanks";
// import { useHistory } from "react-router-dom";
import {
  onSnapshot,
  collection,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import {
  getAuth,
  // signInWithEmailAndPassword,
  onAuthStateChanged,
  // signOut,
} from "firebase/auth";
import db from "./database/firebase";
import {
  useDispatch,
  useSelector
} from "react-redux";
import { productData } from "./Store/Reducers/productReducer";
import { productSearchData } from "./Store/Reducers/productSearchReducer";
import { arrivalData } from "./Store/Reducers/arrivalReducer";
import { checkArrivalData } from "./Store/Reducers/checkArrivalReducer";
import { toysArrivalData } from './Store/Reducers/toysArrivalReducer';
import { watchesArrivalData } from './Store/Reducers/watchesArrivalReducer';
import { bestData } from "./Store/Reducers/bestReducer";
import { flashSaleData } from "./Store/Reducers/flashSaleReducer";
import { categoryData } from "./Store/Reducers/mainCategoryReducer";
import { loginUserGet } from "./Store/Reducers/userGetReducer";
import { loginUser } from "./Store/Reducers/userReducer";
import DotLoader from "react-spinners/DotLoader";

// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";

// import { dataCalling } from './database/dataCalling';
// import under from './assets/logo.png'
function App() {
  const [itemSearch, setItemSearch] = useState("");
  // dataCalling()
  // const history = useHistory();
  const [isLoad, setIsLoad] = useState(true)
  const [isCatLoad, setIsCatLoad] = useState(true)
  const dispatch = useDispatch();

  // ............Product...................................................

  const [lastDoc, setLastDoc] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false)
  const [isPLoad, setIsPLoad] = useState(false)

  useEffect(async () => {
    const collectionRef = collection(db, "product");
    const q = query(collectionRef,
      where("quantity", ">", 0),
      // orderBy("quantity"),
      // orderBy('name', 'desc'),
      // limit(24)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const lastDoc = snapshot.docs[24 - 1];
      // setBestSale(data);
      // data.map((data) => {
      //   data.quantity == 0 ? null :
      //     dispatch(productData(data))
      // }
      // )
      console.log("snap of pod", snapshot.docs.length);
      
      dispatch(productData(data.sort(() => 0.5 - Math.random()).slice(0,18)))
      // setIsLoad(false)
      setLastDoc(lastDoc);
    });

    return unsub;
  }, []);

  const productD = useSelector((state) => state.product.initialState);

  const fetchMore = () => {
    setIsPLoad(true)
    // useEffect(async () => {
    const collectionRef = collection(db, "product");
    const q = query(collectionRef,
      where("quantity", '>', 0),
      orderBy("quantity"),
      orderBy('name', 'desc'),
      startAfter(lastDoc),
      limit(24)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const isCollectionEmpty = snapshot.size === 0;
      if (!isCollectionEmpty) {

        const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const lastDoc = snapshot.docs[snapshot.docs.length - 1];
        // setBestSale(bestSale => [...bestSale, ...data]);
        // data.map((data) => {
        //   data.quantity == 0 ? null :
        //     dispatch(productData([...productD, ...data]))
        // })

        dispatch(productData([...productD, ...data]))
        // setIsLoad(false)
        setLastDoc(lastDoc);
      } else {
        setIsEmpty(true);
      }
      setIsPLoad(false)
    });

    return unsub;
    // }, []);


  }





  // ............Product for search...................................................



  useEffect(async () => {
    const collectionRef = collection(db, "product");
    const q = query(collectionRef,
      where("quantity", ">", 0),
      orderBy("quantity"),
      orderBy('name', 'desc'),
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      
      dispatch(productSearchData(data))
    });

    return unsub;
  }, []);





  // ............New Arrivals...................................................






  const [lastDocA, setLastDocA] = useState([]);

  const [isEmptyA, setIsEmptyA] = useState(false)
  const [isLoadA, setIsPLoadA] = useState(false)

  useEffect(async () => {
    const collectionRef = collection(db, "product");
    const q = query(collectionRef,
      where("quantity", '>', 0),
      orderBy("quantity"),
      orderBy('name', 'desc'),
      where("subcat1", '==', 'NewArrival'),
      // orderBy("subcat1", "asc"),
      // limit(20)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const lastDocA = snapshot.docs[20 - 1];
      // setBestSale(data);
      dispatch(arrivalData(data.sort(() => 0.5 - Math.random()).slice(0,18)))
      // setIsLoad(false)
      setLastDocA(lastDocA);
    });

    return unsub;
  }, []);

  const arrivalD = useSelector((state) => state.arrival.initialState);

  const fetchMoreA = () => {
    setIsPLoadA(true)
    // useEffect(async () => {
    const collectionRef = collection(db, "product");
    const q = query(collectionRef,
      where("quantity", '>', 0),
      orderBy("quantity"),
      orderBy('name', 'desc'),
      where("subcat1", '==', 'NewArrival'),
      // orderBy("subcat1", "asc"),
      startAfter(lastDocA),
      limit(20)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const isCollectionEmpty = snapshot.size === 0;
      if (!isCollectionEmpty) {

        const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const lastDocA = snapshot.docs[snapshot.docs.length - 1];
        // setBestSale(bestSale => [...bestSale, ...data]);
        dispatch(arrivalData([...arrivalD, ...data]))
        // setIsLoad(false)
        setLastDocA(lastDocA);
      } else {
        setIsEmptyA(true);
      }
      setIsPLoadA(false)
    });

    return unsub;
    // }, []);


  }










    // ............Check Arrivals...................................................






    const [lastDocC, setLastDocC] = useState([]);

    const [isEmptyC, setIsEmptyC] = useState(false)
    const [isLoadC, setIsPLoadC] = useState(false)
  
    useEffect(async () => {
      const collectionRef = collection(db, "product");
      const q = query(collectionRef,
        where("quantity", '>', 0),
        orderBy("quantity"),
        orderBy('name', 'desc'),
        where("otherCategory", '==', 'PERFUMES & BODYSPRAY'),
        // orderBy("subcat1", "asc"),
        limit(20)
      );
  
      const unsub = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const lastDocC = snapshot.docs[snapshot.docs.length - 1];
        // setBestSale(data);
        
        dispatch(checkArrivalData(data))
        // setIsLoad(false)
        setLastDocC(lastDocC);
      });
  
      return unsub;
    }, []);
  
    const checkArrivalD = useSelector((state) => state.checkArrival.initialState);
  
    const fetchMoreC = () => {
      setIsPLoadC(true)
      // useEffect(async () => {
      const collectionRef = collection(db, "product");
      const q = query(collectionRef,
        where("quantity", '>', 0),
        orderBy("quantity"),
        orderBy('name', 'desc'),
        where("otherCategory", '==', 'PERFUMES & BODYSPRAY'),
        // orderBy("subcat1", "asc"),
        startAfter(lastDocC),
        limit(20)
      );
  
      const unsub = onSnapshot(q, (snapshot) => {
        const isCollectionEmpty = snapshot.size === 0;
        if (!isCollectionEmpty) {
  
          const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          const lastDocC = snapshot.docs[snapshot.docs.length - 1];
          // setBestSale(bestSale => [...bestSale, ...data]);
          dispatch(checkArrivalData([...checkArrivalD, ...data]))
          // setIsLoad(false)
          setLastDocA(lastDocC);
        } else {
          setIsEmptyC(true);
        }
        setIsPLoadC(false)
      });
  
      return unsub;
      // }, []);
  
  
    }








    // ............Toys Arrivals...................................................






    const [lastDocG, setLastDocG] = useState([]);

    const [isEmptyG, setIsEmptyG] = useState(false)
    const [isLoadG, setIsPLoadG] = useState(false)
  
    useEffect(async () => {
      const collectionRef = collection(db, "product");
      const q = query(collectionRef,
        where("quantity", '>', 0),
        orderBy("quantity"),
        orderBy('name', 'desc'),
        where("otherCategory", '==', 'TOYS AND GAMES'),
        // orderBy("subcat1", "asc"),
        limit(20)
      );
  
      const unsub = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const lastDocC = snapshot.docs[snapshot.docs.length - 1];
        // setBestSale(data);
        
        dispatch(toysArrivalData(data))
        // setIsLoad(false)
        setLastDocG(lastDocG);
      });
  
      return unsub;
    }, []);
  
    const toysArrivalD = useSelector((state) => state.toysArrival.initialState);
  
    const fetchMoreG = () => {
      setIsPLoadG(true)
      // useEffect(async () => {
      const collectionRef = collection(db, "product");
      const q = query(collectionRef,
        where("quantity", '>', 0),
        orderBy("quantity"),
        orderBy('name', 'desc'),
        where("otherCategory", '==', 'TOYS AND GAMES'),
        // orderBy("subcat1", "asc"),
        startAfter(lastDocG),
        limit(20)
      );
  
      const unsub = onSnapshot(q, (snapshot) => {
        const isCollectionEmpty = snapshot.size === 0;
        if (!isCollectionEmpty) {
  
          const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          const lastDocG = snapshot.docs[snapshot.docs.length - 1];
          // setBestSale(bestSale => [...bestSale, ...data]);
          dispatch(toysArrivalData([...toysArrivalD, ...data]))
          // setIsLoad(false)
          setLastDocG(lastDocG);
        } else {
          setIsEmptyG(true);
        }
        setIsPLoadG(false)
      });
  
      return unsub;
      // }, []);
  
  
    }








    // ............Watches Arrivals...................................................


    const [lastDocF, setLastDocF] = useState([]);

    const [isEmptyF, setIsEmptyF] = useState(false)
    const [isLoadF, setIsPLoadF] = useState(false)
  
    useEffect(async () => {
      const collectionRef = collection(db, "product");
      const q = query(collectionRef,
        where("quantity", '>', 0),
        orderBy("quantity"),
        orderBy('name', 'desc'),
        where("otherCategory", '==', 'WATCHES AND BANDS'),
        // orderBy("subcat1", "asc"),
        limit(20)
      );
  
      const unsub = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const lastDocF = snapshot.docs[snapshot.docs.length - 1];
        // setBestSale(data);
        
        dispatch(watchesArrivalData(data))
        // setIsLoad(false)
        setLastDocF(lastDocF);
      });
  
      return unsub;
    }, []);
  
    const watchesArrivalD = useSelector((state) => state.watchesArrival.initialState);
  
    const fetchMoreF = () => {
      setIsPLoadF(true)
      // useEffect(async () => {
      const collectionRef = collection(db, "product");
      const q = query(collectionRef,
        where("quantity", '>', 0),
        orderBy("quantity"),
        orderBy('name', 'desc'),
        where("otherCategory", '==', 'WATCHES AND BANDS'),
        // orderBy("subcat1", "asc"),
        startAfter(setLastDocF),
        limit(20)
      );
  
      const unsub = onSnapshot(q, (snapshot) => {
        const isCollectionEmpty = snapshot.size === 0;
        if (!isCollectionEmpty) {
  
          const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          const lastDocF = snapshot.docs[snapshot.docs.length - 1];
          // setBestSale(bestSale => [...bestSale, ...data]);
          dispatch(watchesArrivalData([...watchesArrivalD, ...data]))
          // setIsLoad(false)
          setLastDocF(lastDocF);
        } else {
          setIsEmptyF(true);
        }
        setIsPLoadF(false)
      });
  
      return unsub;
      // }, []);
  
  
    }




  // ............Best Sale...................................................






  const [lastDocB, setLastDocB] = useState([]);

  const [isEmptyB, setIsEmptyB] = useState(false)
  const [isLoadB, setIsPLoadB] = useState(false)

  const bestD = useSelector((state) => state.best.initialState);
  useEffect(async () => {
    const collectionRef = collection(db, "product");
    const q = query(collectionRef,
      // where("quantity", '>', 0),
      // orderBy("quantity"),
      where("subcat", '==', 'BestSaleItem'),
      // orderBy("subcat", 'desc'),
      limit(40)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const lastDocB = snapshot.docs[snapshot.docs.length - 1];
      // setBestSale(data);
      dispatch(bestData(data))
      setIsLoad(false)
      setLastDocB(lastDocB);
    });

    return unsub;
  }, []);


  const fetchMoreB = () => {
    setIsPLoadB(true)
    // useEffect(async () => {
    const collectionRef = collection(db, "product");
    const q = query(collectionRef,
      // where("quantity", '>', 0),
      // orderBy("quantity"),
      where("subcat", '==', 'BestSaleItem'),
      // orderBy("subcat", 'desc'),
      startAfter(lastDocB),
      limit(20)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const isCollectionEmpty = snapshot.size === 0;
      if (!isCollectionEmpty) {

        const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const lastDocB = snapshot.docs[snapshot.docs.length - 1];
        // setBestSale(bestSale => [...bestSale, ...data]);
        dispatch(bestData([...bestD, ...data]))
        // setIsLoad(false)
        setLastDocB(lastDocB);
      } else {
        setIsEmptyB(true);
      }
      setIsPLoadB(false)
    });

    return unsub;
    // }, []);


  }







  // ............Flash Product...................................................






  const [lastFDoc, setLastFDoc] = useState([]);
  const [isFEmpty, setIsFEmpty] = useState(false)
  const [isFLoad, setIsFLoad] = useState(false)

  useEffect(async () => {
    const collectionRef = collection(db, "timesale");
    const q = query(
      collectionRef,
      where("quantity", '>', 0),
      orderBy("quantity"),
      orderBy("name", "asc"),
      limit(20)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const lastFDoc = snapshot.docs[snapshot.docs.length - 1];
      // setProduct(data);
      dispatch(flashSaleData(data))
      setLastFDoc(lastFDoc);
    });

    return unsub;
  }, []);


  const flashD = useSelector((state) => state.flashSale.initialState);
  const flashMore = () => {
    setIsFLoad(true)

    const collectionRef = collection(db, "timesale");
    const q = query(
      collectionRef,
      where("quantity", '>', 0),
      orderBy("quantity"),
      orderBy("name", "asc"),
      startAfter(lastFDoc),
      limit(20)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const isCollectionEmpty = snapshot.size === 0;
      if (!isCollectionEmpty) {
        const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const lastFDoc = snapshot.docs[snapshot.docs.length - 1];
        // setProduct(data);
        dispatch(flashSaleData([...flashD, ...data]))
        setLastFDoc(lastFDoc);
      }
      else {
        setIsFEmpty(true);
      }
      setIsFLoad(false)

    });

    return unsub;

  }



  // ............Main Category...................................................




  useEffect(async () => {
    const collectionProduct = collection(db, "MainCategory");

    const unsub = onSnapshot(collectionProduct, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      // setProduct(data);
      dispatch(categoryData(data))
      setIsCatLoad(false)
    });

    return unsub;
  }, []);









  //........................................................................................





  useEffect(() => {
    const collectionProduct = collection(db, "userData");

    const unsub = onSnapshot(collectionProduct, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(loginUserGet(data));
    });

    return unsub;
  }, []);









  // ............Cart & Userss...................................................







  const [cartCount, setCartCount] = useState([]);


  const udata = useSelector((state) => state.user.initialState);



  useEffect(async () => {
    // const collectionRef = collection(db, `${udata.id}`);
    const collectionRef = collection(db, 'addToCart', `${udata.id}`, `${udata.id}`);
    const q = query(collectionRef);

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCartCount(data);
      // console.log("dataCart...", data)
    });

    return unsub;
  }, [udata.id]);

  const [userState, setUserState] = React.useState();

  const product = useSelector((state) => state.userGet.initialState);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      if (product) {
        product.map((data) => {
          if (data.email == user.email) {
            dispatch(loginUser(data));
          }
        });
      }
      setUserState(true);
    } else {
      setUserState(false);
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 4000)
    // productD ? setLoading(false) : setLoading(true)

  }, [])



  //.................Register......................................................
















  return (
    <>
      {
        loading ?
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              backgroundColor: 'black',
              height: '100vh',
            }}
          >

            <DotLoader
              color={"white"}
              loading={loading}
              size={100}
            />
          </div>
          :
          <>
            {/* <div style={{ textAlign: 'center', width: "350px", margin: '30px auto' }}>
      
      <img style={{ backgroundSize: 'contain' }} src={under} />
      <h1>Website Under Maintenance</h1>
    </div> */}
            <Router className='container'>
              <MenuAppBar cartCount={cartCount} setItemSearch={setItemSearch} />
              
              <NavBar />
              <Switch>
                {/* { */}

                {/* // itemSearch ? */}
                <Route exact path='/search' >
                  <Search itemSearch={itemSearch} />
                </Route>

                {/* // : */}
                <Route exact path='/' >
                  <Home isPLoad={isPLoad} isEmpty={isEmpty} fetchMore={fetchMore} isLoad={isLoad} isCatLoad={isCatLoad} itemSearch={itemSearch} />
                </Route>
                {/* } */}
                <Route exact path='/newArrival'  >
                  <NewArrival fetchMoreA={fetchMoreA} isEmptyA={isEmptyA} isLoadA={isLoadA} />
                </Route>

                <Route exact path='/checkArrival'  >
                  <CheckArrival fetchMoreC={fetchMoreC} isEmptyC={isEmptyC} isLoadC={isLoadC} />
                </Route>

                <Route exact path='/bestSale'  >
                  <BestSaleItem isLoadB={isLoadB} isEmptyB={isEmptyB} fetchMoreB={fetchMoreB} />
                </Route>
                <Route exact path='/flashSale'>
                  <FlashSale isFLoad={isFLoad} isFEmpty={isFEmpty} flashMore={flashMore} />
                </Route>
                <Route exact path='/Login'  >
                  <Login userState={userState} />
                </Route>
                <Route exact path='/Register' component={Register} />
                <Route exact path='/AddToCart' >
                  <AddToCart cartCount={cartCount} />
                </Route>
                <Route exact path='/ProductDetail/:productName'>
                  <ProductDetail cartCount={cartCount} />
                  {/* <Route exact path='/:productName' >
                    <ProductDetail cartCount={cartCount} />
                  </Route> */}
                </Route>
                <Route exact path='/FlashProductDetail' component={FlashProductDetail} />
                <Route exact path='/Payment' component={Payment} />
                <Route exact path='/CheckOut' component={CheckOut} />
                <Route exact path='/Categories' component={Categories} />
                <Route exact path='/Thanks' component={Thanks} />
                <Route exact path='/ResetPassword' component={ResetPassword} />
                <Route component={PageNotFound} />
              </Switch>
            </Router>
            <Footer />
          </>
      }
    </>
  );
}

export default App;

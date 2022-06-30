import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";


// const firebaseConfig = {
//   apiKey: "AIzaSyB80Ku7YQrDO3cpjqGlh1-P16foeI4SGU4",
//   authDomain: "jaymart-e0669.firebaseapp.com",
//   projectId: "jaymart-e0669",
//   storageBucket: "jaymart-e0669.appspot.com",
//   messagingSenderId: "937049196634",
//   appId: "1:937049196634:web:31ef67d4fd22cc5382f063",
//   measurementId: "G-C36HSYMRR9",
// };


// NEW CONFIGURATION

const firebaseConfig = {
  apiKey: "AIzaSyAA_U-jiMTIh94MhCc7QvgSZ4LmexsveCQ",
  authDomain: "suhaimas-web.firebaseapp.com",
  projectId: "suhaimas-web",
  storageBucket: "suhaimas-web.appspot.com",
  messagingSenderId: "652540507791",
  appId: "1:652540507791:web:795cc5ea4389bc87e3a2fa",
  measurementId: "G-ZN9577KJ8Y"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default getFirestore();
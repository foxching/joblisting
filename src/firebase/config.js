// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import app from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBetm3N10Sc-LUFCNnS_kvI1T33-q4asmY",
  authDomain: "job-listing-ea55c.firebaseapp.com",
  databaseURL: "https://job-listing-ea55c.firebaseio.com",
  projectId: "job-listing-ea55c",
  storageBucket: "job-listing-ea55c.appspot.com",
  messagingSenderId: "685775742568",
  appId: "1:685775742568:web:bb8716514807c1de24fddd",
  measurementId: "G-3CTZD8C3H2"
};

const firebase = app.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export { firebase, firestore, app };

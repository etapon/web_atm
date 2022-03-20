import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAmMKZ8AH82CGhhVfYmAPdOi5CSufEBsTQ",
  authDomain: "e-tapon-mo.firebaseapp.com",
  databaseURL: "https://e-tapon-mo-default-rtdb.firebaseio.com",
  projectId: "e-tapon-mo",
  storageBucket: "e-tapon-mo.appspot.com",
  messagingSenderId: "967918231131",
  appId: "1:967918231131:web:b432c944d3ea55968be97e",
  measurementId: "G-MRS0T3MPTL"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCvxX47jkwMYDGvrbKfXM1xLEdS9vUJGz0",
    authDomain: "fir-tutorial-e2215.firebaseapp.com",
    projectId: "fir-tutorial-e2215",
    storageBucket: "fir-tutorial-e2215.appspot.com",
    messagingSenderId: "722406761589",
    appId: "1:722406761589:web:61ff1e0e97d85eac46443c",
    measurementId: "G-GVRJ51CM5Y"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);
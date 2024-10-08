import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAFnbw62s88K2dphx-nnAMfSc3wrQ1jtGE",
  authDomain: "to-do-list-ebc0e.firebaseapp.com",
  projectId: "to-do-list-ebc0e",
  storageBucket: "to-do-list-ebc0e.appspot.com",
  messagingSenderId: "757914312807",
  appId: "1:757914312807:web:fea4b0328ed0fe480d74c2",
};

const app = initializeApp(firebaseConfig);

export default app;

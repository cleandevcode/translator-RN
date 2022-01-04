import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const config = {
  apiKey: "AIzaSyBbwTDxgIe4-_l7XnUh6Ew3LoXPJZRBtyg",
  authDomain: "time-management-a07c6.firebaseapp.com",
  projectId: "time-management-a07c6",
  storageBucket: "time-management-a07c6.appspot.com",
  messagingSenderId: "71150239830",
  appId: "1:71150239830:web:c75e024a3e080ee9a6fbf7",
  measurementId: "G-BFXNDT0831",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export { firebase };


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';   // <----
let firebaseApp;
SetupFirebase();

/**
* Firebase Initialization Function
* This must be called before any firebase query
*/
function SetupFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyBAe9iDLZ4hAidE_MHpOsNZbYCTX54s240",
        authDomain: "donation-sardhardham.firebaseapp.com",
        projectId: "donation-sardhardham",
        storageBucket: "donation-sardhardham.appspot.com",
        messagingSenderId: "277309492136",
        appId: "1:277309492136:web:3a3aa6a7dc5417fb542b9d",
        measurementId: "G-2FGG1ZZ6XF"
    };
    // Initialize Firebase
    firebaseApp = firebase.initializeApp(firebaseConfig);
}

export default firebaseApp;
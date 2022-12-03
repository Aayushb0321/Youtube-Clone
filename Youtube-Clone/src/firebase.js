import firebase from "firebase/compat/app";
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDPYXlHC2wZ4CKiudp9nhOVaW4p6y5kgh4",
    authDomain: "clone-9521.firebaseapp.com",
    projectId: "youtube-clone-9521",
    storageBucket: "youtube-clone-9521.appspot.com",
    messagingSenderId: "286065680909",
    appId: "1:286065680909:web:dfbeab9ba1f933570aab44"
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();




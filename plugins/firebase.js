import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRz9YcUbbMRICn7BGYU10vYnTSCDTx1Jg",
    authDomain: "dashboard-school-5b47d.firebaseapp.com",
    databaseURL: "https://dashboard-school-5b47d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dashboard-school-5b47d",
    storageBucket: "dashboard-school-5b47d.appspot.com",
    messagingSenderId: "919549568218",
    appId: "1:919549568218:web:37f4773f763bc0a6c1b1e3"
};
// Initialize Firebase

let app = null
if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const storeFile = firebase.storage()
export default firebase
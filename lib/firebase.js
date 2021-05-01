import firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBDTmBK3W5uNjkiEvUJQTAWcx0nsUMh-QU",
  authDomain: "instagram-clone-477ba.firebaseapp.com",
  projectId: "instagram-clone-477ba",
  storageBucket: "instagram-clone-477ba.appspot.com",
  messagingSenderId: "1025267586156",
  appId: "1:1025267586156:web:df2f015c98e25608b33449",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const serverTime = firebase.firestore.FieldValue.serverTimestamp;
export { db, auth, storage, serverTime };

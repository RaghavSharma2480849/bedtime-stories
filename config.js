
import * as firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyC5E5LSVodro_JS00HGQdatXLUxCXYcyA8",
  authDomain: "bedtime-5acd1.firebaseapp.com",
  databaseURL: "https://bedtime-5acd1.firebaseio.com",
  projectId: "bedtime-5acd1",
  storageBucket: "bedtime-5acd1.appspot.com",
  messagingSenderId: "659916046322",
  appId: "1:659916046322:web:3ab9791c96ca1c4f7b756b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();

import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyAq8zT2NHzj33UVOuYBkO5PqM6P3kEQ7CM",
  authDomain: "automatic-quiz-system.firebaseapp.com",
  databaseURL: "https://automatic-quiz-system-default-rtdb.firebaseio.com",
  projectId: "automatic-quiz-system",
  storageBucket: "automatic-quiz-system.appspot.com",
  messagingSenderId: "195466373196",
  appId: "1:195466373196:web:13a06f82cbd7b7e7bd2ce9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
export default firebase;

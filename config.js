import firebase from 'firebase'
require("@firebase/firestore")

var firebaseConfig = {
    apiKey: "AIzaSyC3ViRD0bOdIH2QP5q1eWrHiLrJRTaXWs8",
    authDomain: "story-hub-pika.firebaseapp.com",
    projectId: "story-hub-pika",
    storageBucket: "story-hub-pika.appspot.com",
    messagingSenderId: "865505995981",
    appId: "1:865505995981:web:abe49f3da9a9de43138d84"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
var firebaseConfig = {
    apiKey: "AIzaSyAapKV95qMKMrjOI6y8upCGeECssgDaDE0",
    authDomain: "todo-list-37de9.firebaseapp.com",
    projectId: "todo-list-37de9",
    storageBucket: "todo-list-37de9.appspot.com",
    messagingSenderId: "871275992107",
    appId: "1:871275992107:web:8d30c4b3d9ad4e0357066e",
    measurementId: "G-JKDW0J410N"
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
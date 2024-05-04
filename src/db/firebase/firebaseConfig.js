const firebase = require('firebase')

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC-T0N9cRRvpi9rEhOgQ56T7fliQFa1RX4",
  authDomain: "marvel-projeto.firebaseapp.com",
  projectId: "marvel-projeto",
  storageBucket: "marvel-projeto.appspot.com",
  messagingSenderId: "41557949861",
  appId: "1:41557949861:web:d7133979cd31c6e5a9bc4c",
  measurementId: "G-956NFSF31K"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

const marvel=db.collection('Marvel')
module.exports= marvel;
const { getFirestore, collection, doc, setDoc,deleteDoc,updateDoc,getDocs} = require('firebase/firestore');
const { initializeApp } = require('firebase/app');

// Inicialize o aplicativo Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC-T0N9cRRvpi9rEhOgQ56T7fliQFa1RX4",
  authDomain: "marvel-projeto.firebaseapp.com",
  projectId: "marvel-projeto",
  storageBucket: "marvel-projeto.appspot.com",
  messagingSenderId: "41557949861",
  appId: "1:41557949861:web:d7133979cd31c6e5a9bc4c",
  measurementId: "G-956NFSF31K"
};

const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

const addCreator = async (fullName) => {
    try {
      const characterRef = doc(collection(db, 'creators'));
      await setDoc(characterRef, {fullName});
      console.log('Creator added successfully');
    } catch (error) {
      console.error('Error adding character:', error);
    }
  };
  
  const deleteCreator = async (id) =>{
      try{
          await deleteDoc(doc(collection(db,'characters'),id.toString()));
          console.log('Character deleted successfully');
      }
      catch(error){
          console.error('Error deleting character:',error)
      }
  }
  
  const updateCreator = async (id,newData) =>{
      try{
          const characterRef = doc(collection(db,'characters'),id.toString());
          await updateDoc(characterRef,newData);
          console.log('Character Updated')
      }
      catch(error){
          console.error('Error updating character', error)
  
      }
  }
  
  const getCreators = async ()=>{
      try{
          const charactersSnapshot = await getDocs(collection(db,'characters'));
          const characters = [];
          charactersSnapshot.forEach((doc)=>{
              characters.push({id:doc.id,...doc.data()});
          })
  
          return characters
      }
      catch(error){
          console.error('Error fetching characters', error)
      }
  }


  module.exports = {getCreators,deleteCreator,updateCreator,addCreator}
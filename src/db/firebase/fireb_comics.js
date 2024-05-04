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

const addComics = async (title,marvelID,description) =>{
    try{
        const comicRef = doc(collection(db,'comics'),marvelID.toString());
        await setDoc(comicRef,{title,description})
        console.log('Comics added successfully')
    }
    catch(error){
        console.error('Error adding comics', error)
    }
}

const deleteComics = async(id) =>{
    try{
    await deleteDoc(doc(collection(db,'comics'),id.toString()));
    console.log('Comic deleted succesfully')
    }
    catch(error){   
        console.error('Error deleting comics', error)

    }}

    const updateComics = async (id,newData)=>{
        try{
        const comicsRef = doc(collection(db,'comics'),id.toString());
        await updateDoc(comicsRef,newData);
        console.log('Comic Updated')
        }
        catch(error){
            console.error('Error updating comics', error)
        }
    }


    const getComics = async()=>{
        try{
            const comicsSnapshot = await getDocs(collection(db,'comics'));
            const comics = [];
            comicsSnapshot.forEach((doc)=>{
                comics.push({id:doc.id ,...doc.data()});
            })

            return comics
        }   
        catch(error){
            console.error('Error fetching comics',error)
        }
    }


module.exports = {getComics,deleteComics,addComics,updateComics}
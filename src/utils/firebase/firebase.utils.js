import {initializeApp } from 'firebase/app';

import 
{getAuth, 
signInWithPopup, 
GoogleAuthProvider,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged,

 }
 from 'firebase/auth'

 import{
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
 }
  from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA-5ojRixaqRjDK5Ic_d1jTDdmhQ3lBdms",
    authDomain: "crown-clothing-db-5edca.firebaseapp.com",
    projectId: "crown-clothing-db-5edca",
    storageBucket: "crown-clothing-db-5edca.appspot.com",
    messagingSenderId: "42517421536",
    appId: "1:42517421536:web:4f98a607b2930000be5f85"
  };
  
 
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();

  export const signInWithGooglePopup  = () => signInWithPopup(auth, googleProvider);
  
  
  export const db = getFirestore();

  export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);

    const batch = writeBatch(db);

    objectsToAdd.forEach((object) =>{
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
        
    } );
        await  batch.commit()
        console.log('done');
  



  }

  export const getcategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories')
       
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q)
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const{title, items} = docSnapshot.data();
        acc[title.toLowerCase()] =items;
        return acc;

    }, {})
    return categoryMap;


  }
 export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid );

    

     const userSnapshot = await getDoc(userDocRef);
    

    //  if user snapShot does not exist
     if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating user', error.message)
            
        }
     }
     return userDocRef;
     
};
export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

   return await createUserWithEmailAndPassword(auth, email, password)

}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

   return await signInWithEmailAndPassword(auth, email, password)


}

export const signOutUser = async ()=>  await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback )
  

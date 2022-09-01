import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { TCategory } from "../../store/categories/categories.types";

const firebaseConfig = {
  apiKey: "AIzaSyDRuhTpXTXbiknt4QZ7X4SGmDoUlipVlFM",
  authDomain: "crwn-clothing-db-7702f.firebaseapp.com",
  projectId: "crwn-clothing-db-7702f",
  storageBucket: "crwn-clothing-db-7702f.appspot.com",
  messagingSenderId: "162291202385",
  appId: "1:162291202385:web:29876a2f7348b98b7e3b70",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

// for popup
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// for redirect
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export type TObjectToAdd = {
  title: string;
};

// async function always return a promise here it doesnot return anything means it returns a promise with void(nothing) value
export const addCollectionAndDocuments = async <T extends TObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);

  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    console.log(object);
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

// async function always return a promise here it return an CategoryArray means it returns a promise with CateogryArray value, which as we know is of type TCategory[]
export const getCollectionAndDocuments = async (): Promise<TCategory[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const categoriesArray = querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as TCategory
  );
  // console.log(categoriesArray);
  return categoriesArray;
};

export type TAdditionalInformation = {
  displayName?: string;
};

export type TUserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

//type User imported from firebase is for authenticated user stored in authentication
// TUserData is for user data stored in our fireStore

export const createUserDocumentFromAuth = async (
  userAuth: User, // User type is given by firebase itself
  additionalInformation = {} as TAdditionalInformation
): Promise<void | QueryDocumentSnapshot<TUserData>> => {
  if (!userAuth) return; // retrun void

  const userDocRef = doc(db, "users", userAuth.uid);
  //   console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  //   console.log(userSnapshot);
  //   console.log(userSnapshot.exists());

  // if a user dont exists then, create that user
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<TUserData>; // return userSnapshot
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

// make a promise returning function to get user to implement saga as it is similar to using async/await ie uses promise
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe(); // unsubscribe immediately as we get a value(signed in user or null)as soon as auth change to prevent memory leak
        resolve(userAuth);
      },
      reject // optional , if promise is rejected this reject method is run
    );
  });
};

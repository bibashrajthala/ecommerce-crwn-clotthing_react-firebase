import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  useEffect(() => {
    const logGoogleUserRedirect = async () => {
      const response = await getRedirectResult(auth);
      console.log(response);
      if (!response) {
        const userDocRef = createUserDocumentFromAuth(response.user);
        console.log(userDocRef);
      }
    };
    logGoogleUserRedirect();
  }, []);

  const logGoogleUser = async () => {
    // const response = await signInWithGooglePopup();
    // console.log(response);
    const { user } = await signInWithGooglePopup();
    const userDocRef = createUserDocumentFromAuth(user);
    console.log(userDocRef);
  };

  // const logGoogleUserRedirect = async () => {
  //   const { user } = await signInWithGoogleRedirect();
  //   const userDocRef = createUserDocumentFromAuth(user);
  //   console.log(userDocRef);
  // };

  return (
    <div>
      <h1>sign in page</h1>
      <button onClick={logGoogleUser}>Sign In With Google Popup</button>
      {/*
      <button onClick={logGoogleUserRedirect}>
        // Sign In With Google Redirect //{" "}
      </button>
  */}
      <button onClick={signInWithGoogleRedirect}>
        Sign In With Google Redirect
      </button>
    </div>
  );
};

export default SignIn;

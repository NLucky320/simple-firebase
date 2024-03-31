import React, { useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase.init";
const Login = () => {
  const [user, setUser] = useState(null);

  const auth = getAuth(app);
  console.log(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    // console.log('google ma am is coming')
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        console.log(result);
        setUser(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

    const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser)
            setUser(loggedUser)
        })
        .catch(error => {
            console.log(error.message)

        })
}
    
  return (
    <div>
      {/* user? logout: sign in  */}
     {user ?  
      (
        <button onClick={handleSignOut}>Sign Out</button>
      ) :  (
        <div>
          <button onClick={handleGoogleSignIn}>Google Login</button>

          <button onClick={handleGithubSignIn}>Github Login</button>
        </div>
          ) }

      {user && (
        <div>
          <h3> User: {user?.displayName} </h3>
          <p>Email: {user?.email}</p>
        </div>
      )}
    </div>
  );
};

export default Login;

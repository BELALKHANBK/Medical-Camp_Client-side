import React, { useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth } from '../../firebase.config';
const googleProvider= new GoogleAuthProvider()

const AuthProvider = ({children}) => {
const [user,setUser]=useState(null)
const [loading,setLoading]=useState(true)
    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)

    }
    const signIn=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)

    }

    const signInWithGoogle=()=>{
setLoading(true)
return signInWithPopup(auth,googleProvider)
    }
    const logOut=()=>{
        return signOut(auth)    
    }

  useEffect(()=>{
const unSubscribe=onAuthStateChanged(auth,currentUser=>{
    setUser(currentUser)
    console.log('user in the auth state chang',currentUser)
    setLoading(false)
})
return()=>{
    unSubscribe()
}
  },[])

    const authInfp={
createUser,
signIn,
user,
loading,
signInWithGoogle,
logOut
    }
    return (
        <AuthContext value={authInfp}>
           {children}
        </AuthContext>
    );
};

export default AuthProvider;
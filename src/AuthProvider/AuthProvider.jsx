import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth } from '../../firebase.config';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // Firebase User Object
  const [role, setRole] = useState(null);      // User role from backend
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

 /*  const logOut = () => {
    return signOut(auth);
      window.location.reload();
  };
 */
const logOut = async () => {
  await signOut(auth);
  window.location.reload();  // page reload করবে
  // অথবা যদি React Router ব্যবহার করো:
  // navigate('/login');
};

// getToken function add করো
const getToken = async () => {
  if (user) {
    return await user.getIdToken();
  }
  return null;
};



  const updateUserProfile = (profileInfo) => {
    return updateProfile(auth.currentUser, profileInfo);
  };

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser); // আগেই user সেট করো

    if (currentUser) {
      try {
        const token = await currentUser.getIdToken();

        //  Backend থেকে role আনো
        const response = await fetch(`https://medical-camp-server-sage.vercel.app/users?email=${currentUser.email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setRole(userData.role || 'participant');
        } else {
          setRole('participant');
        }
      } catch (error) {
        console.error('Failed to fetch user role:', error);
        setRole('participant');
      }
    } else {
      setRole(null);
    }

    setLoading(false);
  });

  return () => unsubscribe();
}, []);

  const authInfo = {
    user,        // Firebase user object
    role,        // Role fetched from backend
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    updateUserProfile,
    logOut,
    getToken
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

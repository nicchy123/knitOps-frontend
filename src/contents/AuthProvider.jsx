import React, { createContext, useEffect, useState } from 'react';
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import app from '../../firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app);
const githubProvider = new GithubAuthProvider()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const createUser = (email, password)=>{
        return createUserWithEmailAndPassword(auth,email, password)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            setLoading(false);
        })
        return ()=> unsubscribe();
    },[])
    const userSignin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
   const guthubSignin = ()=>{
    setLoading(true);
    return signInWithPopup(auth,githubProvider)
   }
 
    const authInfo = {
        user,
        loading,
        createUser,
        userSignin,
        setLoading,
        guthubSignin

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
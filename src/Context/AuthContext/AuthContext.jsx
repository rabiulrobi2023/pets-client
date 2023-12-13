import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../../Firebase/firebase.config";


export const authContext = createContext(null)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
const AuthContext = ({ children }) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    const createUserWithPass = (email, passowrd) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, passowrd)
    }

    const loginWithPass=(email,passowrd)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,passowrd)
    }

    const loginWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth,provider)
    }



    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {

        const unSubcribe = onAuthStateChanged(auth, currentUser => {
            setLoading(false)
            setUser(currentUser)
            
        })
        return () => unSubcribe()
    }
        , [])


    const updateUserPro = (userName, userPhoto) => {
        setLoading(true)
        updateProfile(auth.currentUser, {
            displayName: userName,
            PhotoURL: userPhoto
        })
    }





    const authInfo = {
        user,
        loading,
        createUserWithPass,
        loginWithPass,
        loginWithGoogle,
        updateUserPro,
        logOut,

    }
    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default AuthContext;
import axios from "axios";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userLoginEmail, setUserLoginEmail] = useState(null);

    // Create User function
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Register new user by using google auth
    const registerWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Log In User
    const logInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Logout user
    const logOut = async () => {
        setLoading(true);

        return signOut(auth);
    };

    // Update Profile
    const updateUserProfile = (name, image) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image,
        });
    };

    // Reset password
    const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    };

    // Get token from server
    const getToken = async (email) => {
        const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            { email },
            { withCredentials: true }
        );

        if (data.token) {
            localStorage.setItem('access-token', data.token);
        }
        return data;
    };

    // State User or Observ current user
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)

            // if (currentUser) {
            // Get token and store client
            //     getToken(currentUser.email);
            // }
            // else {
            // TODO: Remove token (if token stored in the client side, local storage, caching, in memory)
            //     localStorage.removeItem('access-token');
            // }

            if (currentUser) {
                // get token and store client
                const userInfo = { email: currentUser?.email };
            }

            // console.log(currentUser)
            setLoading(false);
        });
        return () => {
            unSubscribe(); // unsubscribe when component unmounts to avoid memory leak
        };
    }, [user, setUser]);

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        logInUser,
        logOut,
        registerWithGoogle,
        updateUserProfile,
        resetPassword,
        userLoginEmail,
        setUserLoginEmail,
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
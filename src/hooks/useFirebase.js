import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signOut, updateProfile, deleteUser } from "firebase/auth";
import initializeAuthentication from "../components/Login/Firebase/firebase.init";


initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [authInfo, setAuthInfo] = useState('');
    const [admin, setAdmin] = useState(false)

    const auth = getAuth();

    const registerUser = (email, password, name, navigate) => {

        setIsLoading(true);

        createUserWithEmailAndPassword(auth, email, password)

            .then((userCredential) => {
                setAuthError('');
                setAuthInfo('');

                const newUser = { email, displayName: name };
                setUser(newUser);
                saveUser(email, name);

                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                });
                navigate('/');

            })
            .catch((error) => {
                setAuthInfo('');
                setAuthError('This email already registered.');

            })
            .finally(() => setIsLoading(false));
    }

    const loginUser = (email, password, location, navigate) => {
        setIsLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                setAuthError('');
                setAuthInfo('');

                const destination = location?.state?.from || '/';
                navigate(destination);

            })
            .catch((error) => {
                setAuthInfo('');
                setAuthError('Email address or password are incorrect.');
            })
            .finally(() => setIsLoading(false));

    };


    const resetPassword = (email) => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setAuthError('');
                setAuthInfo('Your request successfully submitted! Please check your email ...')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    const emailVerification = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                // Email verification sent!
                // ...
            });
    }

    const deleteUserAccount = () => {

        const user = auth.currentUser;

        deleteUser(user).then(() => {
            // User deleted.
        }).catch((error) => {
            // An error ocurred
            // ...
        });

    }


    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, []);

    useEffect(() => {
        fetch(`https://photo-album-server.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
    }, [user.email])

    const logout = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            setAuthError('');
        }).catch((error) => {
            setAuthError(error.message);
        })
            .finally(() => setIsLoading(false));
    }

    const saveUser = (email, displayName) => {
        const user = { email, displayName };
        fetch('https://photo-album-server.herokuapp.com/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }

    return {
        user,
        isLoading,
        authError,
        authInfo,
        admin,
        registerUser,
        loginUser,
        logout,
        resetPassword,
        emailVerification,
        deleteUserAccount
    }
}

export default useFirebase;
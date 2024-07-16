import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {UserCredentials, UserRegisterCredentials} from "@/types/user";
import {doc, setDoc} from "firebase/firestore";
import {dataBase} from '@/databaseService/firebaseInit'

const auth = getAuth();


async function registerUser(user: UserRegisterCredentials) {
    const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
    await setDocument(userCredential.user.uid)
    return userCredential.user;
}

async function loginUser(user: UserCredentials) {
    const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
    return userCredential.user;
}

async function setDocument(userUid: string) {
    await setDoc(doc(dataBase, 'users', userUid ), {})
}

async function isUserLoggedIn() {
    return await getCurrentUser()
}

function getCurrentUser() {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(auth, user => {
            removeListener()
            resolve(user)
        })
        reject
    })
}

async function signOutUser() {
    await signOut(auth)
}

function createRecordReference() {
    const userUid = auth.currentUser?.uid;
    return doc(dataBase, "users", userUid as string);
}

export { registerUser, loginUser, isUserLoggedIn, signOutUser, getCurrentUser, createRecordReference }
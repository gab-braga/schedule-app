import app from "./config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const auth = getAuth(app);

async function signUp(email, password) {
  const userCredencial = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const { user } = userCredencial;
  return user;
}

async function signIn(email, password) {
  const userCredencial = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const { user } = userCredencial;
  return user;
}

async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const credencial = signInWithPopup(auth, provider);
  const { user } = credencial;
  return user;
}

async function signOut() {
  await signOutFirebase(auth);
}

function getAuthUser(callUser) {
  onAuthStateChanged(auth, callUser);
}

export { signUp, signIn, signInWithGoogle, signOut, getAuthUser };

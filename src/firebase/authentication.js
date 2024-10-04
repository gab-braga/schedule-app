import app from './config';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

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
}

function getAuthUser(callUser) {
  onAuthStateChanged(auth, callUser);
}

export { signUp, signIn, getAuthUser };

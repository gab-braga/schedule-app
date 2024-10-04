import { createContext, useContext, useEffect, useState } from 'react';
import { getAuthUser, signIn, signInWithGoogle, signOut, signUp } from '../firebase/authentication';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(null);

  async function registerUser(email, password) {
    await signUp(email, password);
    await signIn(email, password);
  }

  async function login(email, password) {
    await signIn(email, password);
  }

  async function loginWithGoogle(email, password) {
    await signInWithGoogle();
  }

  async function logout() {
    await signOut();
  }

  useEffect(() => {
    getAuthUser(user => {
      if(user) {
        setUser(user);
        setAuthenticated(true);
      } else {
        setUser(null);
        setAuthenticated(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerUser,
        login,
        loginWithGoogle,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };

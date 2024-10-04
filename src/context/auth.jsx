import { createContext, useContext, useEffect, useState } from 'react';
import { getAuthUser, signIn, signInWithGoogle, signOut, signUp } from '../firebase/authentication';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(null);

  async function registerUser(email, password) {
    await signUp(email, password);
    await signIn(email, password);
    setAuthenticated(true);
  }

  async function login(email, password) {
    await signIn(email, password);
    setAuthenticated(true);
  }

  async function loginWithGoogle(email, password) {
    await signInWithGoogle();
    setAuthenticated(true);
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
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Carregando...</p>;

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

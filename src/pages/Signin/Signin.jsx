import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";

import "./Signin.css";

export default () => {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  const [message, setMessage] = useState(null);

  async function handleSignIn({ email, password }) {
    setMessage("Carregando...");
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
      setMessage("Erro. Tente novamente.");
    }
  }

  async function handleSignInGoogle() {
    setMessage("Carregando...");
    try {
      await loginWithGoogle();
      navigate("/");
    } catch(error) {
      console.error(error);
      setMessage("Erro. Tente novamente.")
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit(handleSignIn)} className="form">
        <h2>{message ? message : "Login"}</h2>
        <button type="button" className="button" onClick={handleSignInGoogle}>Entrar com Google</button>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input type="email" className="input" {...register("email", { required: true })} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input type="password" className="input" {...register("password", { required: true })} />
        </div>
        <button type="submit" className="button">Entrar</button>
        <Link to="/signup" className="link">Cadastre-se</Link>
      </form>
    </div>
  );
};

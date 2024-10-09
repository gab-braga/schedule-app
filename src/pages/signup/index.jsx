import "./style.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/auth";

export default () => {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const { registerUser, loginWithGoogle } = useAuth();

  async function handleSignUp({ email, password }) {
    setMessage("Carregando...");
    try {
      await registerUser(email, password);
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
    } catch (error) {
      console.error(error);
      setMessage("Erro. Tente novamente.")
    }
  }

  return (
    <div className="signup">
      <form onSubmit={handleSubmit(handleSignUp)} className="form">
        <h2>{message ? message : "Cadastre-se"}</h2>
        <button type="button" className="btn" onClick={handleSignInGoogle}>Entrar com Google</button>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input type="email" className="input" {...register("email", { required: true })} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input type="password" className="input" {...register("password", { required: true })} />
        </div>
        <button type="submit" className="btn">Cadastrar</button>
        <Link to="/signin" className="link center">Login</Link>
      </form>
    </div>
  );
};

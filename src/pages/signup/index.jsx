import './style.css';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/auth';

export default () => {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const { registerUser, loginWithGoogle } = useAuth();

  async function handleSignIn({ email, password }) {
    setMessage('Carregando...');
    try {
      await registerUser(email, password);
      navigate('/');
    } catch (error) {
      console.error(error);
      setMessage('Erro. Tente novamente.');
    }
  }

  async function handleSignInGoogle() {
    setMessage('Carregando...');
    try {
      await loginWithGoogle();
      navigate('/');
    } catch(error) {
      console.error(error);
      setMessage('Erro. Tente novamente.')
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit(handleSignIn)} className="form">
        <h2>{message ? message : 'Cadastre-se'}</h2>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input type="email" {...register('email', { required: true })} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            {...register('password', { required: true })}
          />
        </div>
        <button type="submit" className="btn">Cadastrar</button>
        <button type="button" className="btn" onClick={handleSignInGoogle}>Entrar com Google</button>
        <Link to="/signin" className='link'>Login</Link>
      </form>
    </div>
  );
};

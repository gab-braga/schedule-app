import './style.css';
import { signIn } from '../../firebase/authentication';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default () => {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  async function onSubmit({ email, password }) {
    setMessage('Carregando...');
    try {
      await signIn(email, password);
      navigate('/');
    } catch (error) {
      console.error(error);
      setMessage('Erro. Tente novamente.');
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h2>{message ? message : 'Login'}</h2>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input type="email" {...register('email', { required: true })} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input type="password" {...register('password', { required: true })} />
        </div>
        <button type="submit">Entrar</button>
        <button type="button">Entrar com Google</button>
        <Link to="/signup" className='link'>Cadastre-se</Link>
      </form>
    </div>
  );
};

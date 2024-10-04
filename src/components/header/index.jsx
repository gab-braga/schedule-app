import { useAuth } from '../../context/auth';
import './style.css';

export default ({ action }) => {
  const { logout } = useAuth();

  return (
    <header className="header">
      <h1>Lista de Tarefas</h1>
      <div className="menu">
      <button onClick={() => action(true)} className='btn sm'>
        Novo &#43;
      </button>
      <button onClick={logout} className='btn sm'>
        Sair &#8702;
      </button>
      </div>
    </header>
  );
};

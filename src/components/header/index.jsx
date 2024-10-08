import "./style.css";
import { useAuth } from '../../context/auth';
import { NavLink } from "react-router-dom";

export default ({ action }) => {
  const { logout } = useAuth();
  
  const getMenuOptionClass = data => data.isActive ? "menu-option active" : "menu-option";

  return (
    <header className="header">
      <div className="menu">
        <nav className="links">
          <NavLink to="/" className={getMenuOptionClass}>Tarefas</NavLink>
          <NavLink to="/schedule" className={getMenuOptionClass}>Agenda</NavLink>
        </nav>
        <div className="control">
          <button onClick={() => action(true)} className="btn sm">
            Novo &#43;
          </button>
          <button onClick={logout} className="btn sm">
            Sair &#8702;
          </button>
        </div>
      </div>
    </header>
  );
};

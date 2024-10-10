import "./style.css";
import { useAuth } from "../../context/auth";
import { NavLink } from "react-router-dom";

import IconAdd from "../..//assets/icons/add.svg";
import IconLogout from "../..//assets/icons/logout.svg";

export default ({ action }) => {
  const { logout } = useAuth();
  
  const getMenuOptionClass = data => data.isActive ? "menu-option active" : "menu-option";

  return (
    <header className="header">
      <div className="container menu">
        <nav className="links">
          <NavLink to="/" className={getMenuOptionClass}>Tarefas</NavLink>
          <NavLink to="/schedule" className={getMenuOptionClass}>Agenda</NavLink>
        </nav>
        <div className="control">
          <button onClick={() => action(true)} className="btn sm">
            Novo
            <img src={IconAdd} className="icon" />
          </button>
          <button onClick={logout} className="btn sm">
            Sair
            <img src={IconLogout} className="icon" />
          </button>
        </div>
      </div>
    </header>
  );
};

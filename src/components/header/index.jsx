import "./style.css";
import { useAuth } from "../../context/auth";
import { NavLink } from "react-router-dom";

import IconAdd from "../..//assets/icons/add.svg";
import IconLogout from "../..//assets/icons/logout.svg";

export default ({ action }) => {
  const { logout } = useAuth();

  const getMenuOptionClass = data => data.isActive ? "header-option active" : "header-option";

  return (
    <header className="header">
      <div className="container header-menu">
        <nav className="header-links">
          <NavLink to="/" className={getMenuOptionClass}>Tarefas</NavLink>
          <NavLink to="/schedule" className={getMenuOptionClass}>Agenda</NavLink>
        </nav>

        <div className="header-control">
          <button onClick={() => action(true)} className="button" data-title="Novo">
            <img src={IconAdd} className="icon" />
          </button>

          <button onClick={logout} className="button" data-title="Sair">
            <img src={IconLogout} className="icon" />
          </button>
        </div>
      </div>
    </header>
  );
};

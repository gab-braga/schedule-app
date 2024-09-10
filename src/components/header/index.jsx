import './style.css';

export default ({ action }) => {
  return (
    <header className="header">
      <h1>Lista de Tarefas</h1>
      <button
        onClick={() => {
          action(true);
        }}
      >
        Novo +
      </button>
    </header>
  );
};

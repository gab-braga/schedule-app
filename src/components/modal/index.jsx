import './style.css';

export default (setShow) => {
  return (
    <div className="bg-modal">
      <div className="modal">
        <h2>Nova Tarefa</h2>

        <form>
          <label htmlFor="content">Tarefa:</label>
          <input type="text" />
          <div className="control">
            <button>Adicionar</button>
            <button type="button" onClick={() => setShow(falses)}>
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

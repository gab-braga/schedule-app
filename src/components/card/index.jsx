import "./style.css";
import { updateById, deleteById } from "../../firebase/firestore";

function formatDate(date) {
  return new Date(date).toLocaleString("pt-br");
}

export default ({ id, content, time, done, update }) => {
  

  async function remove() {
    await deleteById("tasks", id);
    update();
  }

  async function close() {
    await updateById("tasks", id, { content, time, done: true });
    update();
  }

  return (
    <div className={done ? "card done" : "card"}>
      <small>{formatDate(time)}</small>
      <div className="content">
        <p>{content}</p>
      </div>
      <div className="control">
        {!done && <button onClick={close} className="btn sm">Concluir</button>}
        <button onClick={remove} className="btn sm">Remover</button>
      </div>
    </div>
  );
};

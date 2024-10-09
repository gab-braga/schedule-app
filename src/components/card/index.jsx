import "./style.css";
import { updateById, deleteById } from "../../firebase/firestore";
import { formatLocalDate } from "../../helpr/date";

export default ({ id, title, content, date, done, update }) => {
  async function remove() {
    await deleteById("tasks", id);
    update();
  }

  async function close() {
    await updateById("tasks", id, { done: true });
    update();
  }

  return (
    <div className={done ? "card done" : "card"}>
      <small className="date">{formatLocalDate(date)}</small>
      <h2 className="title">{title}</h2>
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

import "./style.css";
import { updateById, deleteById } from "../../firebase/firestore";

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

export default ({ id, title, content, date, done, update }) => {
  

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
      <small className="date">{formatDate(date)}</small>
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

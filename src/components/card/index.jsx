import "./style.css";
import { deleteTask, updateTask } from "../../service/task";
import { formatLocalDate } from "../../helpr/date";

export default ({ id, title, content, date, done, update }) => {
  async function handleDeleteTask() {
    await deleteTask(id);
    update();
  }

  async function handleCompleteTask() {
    await updateTask(id, { done: true });
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
        {!done && (
          <button onClick={handleCompleteTask} className="btn sm">
            Concluir
          </button>
        )}
        <button onClick={handleDeleteTask} className="btn sm">
          Remover
        </button>
      </div>
    </div>
  );
};

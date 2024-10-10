import "./style.css";
import { deleteTask, updateTask } from "../../service/task";
import { formatLocalDate } from "../../helpr/date";

import IconDelete from "../../assets/icons/delete.svg";
import IconCheck from "../../assets/icons/check.svg";

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
      <small className="date">
        {formatLocalDate(date)}
      </small>

      <h2 className="title">{title}</h2>
      <div className="content">
        <p>{content}</p>
      </div>

      <div className="control">
        {!done && (
          <button onClick={handleCompleteTask} className="button" data-title="Concluir">
            <img src={IconCheck} className="icon" />
          </button>
        )}

        <button onClick={handleDeleteTask} className="button" data-title="Remover">
          <img src={IconDelete} className="icon" />
        </button>
      </div>
    </div>
  );
};

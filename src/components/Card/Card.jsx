import { deleteAllTasks, deleteTask, updateAllTasks, updateTask } from "../../service/task";
import { formatLocalDate } from "../../helpr/date";

import IconDelete from "../../assets/icons/delete.svg";
import IconEdit from "../../assets/icons/edit.svg";

import "./Card.css";

export default ({ id, title, content, date, update, hourStart, hourEnd }) => {

  async function handleDeleteTask() {
    const confirm = window.confirm("Deseja excluir?");
    if (confirm) {
      await deleteTask(id);
      await deleteAllTasks(id);
      update();
    }
  }

  async function handleEditTask() {
    const titleEdit = window.prompt("Título:", String(title));
    if (titleEdit == null) return;

    const contentEdit = window.prompt("Descrição:", String(content));
    if (contentEdit == null) return;

    const hourStartEdit = window.prompt("Início (HH:MM):", String(hourStart));
    if (hourStartEdit == null) return;

    const hourEndEdit = window.prompt("Término (HH:MM):", String(hourEnd));
    if (hourEndEdit == null) return;

    const data = {
      title: titleEdit || title,
      content: contentEdit || content,
      hourStart: hourStartEdit || hourStart,
      hourEnd: hourEndEdit || hourEnd
    };

    await updateTask(id, data);
    await updateAllTasks(id, data);
    update();
  }

  return (
    <div className="card">
      <small className="date">
        {formatLocalDate(date)}
      </small>

      <h2 className="title">{title}</h2>
      <div className="content">
        <p>{content}</p>
      </div>

      <div className="control">
        <button onClick={handleDeleteTask} className="button" data-title="Remover">
          <img src={IconDelete} className="icon" />
        </button>

        <button onClick={handleEditTask} className="button" data-title="Editar">
          <img src={IconEdit} className="icon" />
        </button>
      </div>
    </div>
  );
};

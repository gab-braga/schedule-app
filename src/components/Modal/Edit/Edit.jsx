import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { findTask, updateTask } from "../../../service/task";

import IconAdd from "../../../assets/icons/add.svg";
import IconClose from "../../../assets/icons/close.svg";

import "../Modal.css";

export default ({ taskId, close, update }) => {
  const { handleSubmit, register, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [taskEdit, setTaskEdit] = useState({});

  async function send(data) {
    setLoading(true);
    updateTask(taskId, data);
    setLoading(false);
    update();
    close();
  }

  async function loadTask() {
    const task = await findTask(taskId);
    setTaskEdit(task);
    const { title, content, date, hourStart, hourEnd } = task;
    reset({ title, content, date, hourStart, hourEnd });
  }

  useEffect(() => {
    loadTask();
  }, [taskId]);

  return (
    <div className="bg-modal">
      <div className="modal">
        <h2>Editar Tarefa</h2>
        <form className="form" onSubmit={handleSubmit(send)}>
          <div className="group">
            <label htmlFor="title">Tarefa:</label>
            <input type="text" className="input" id="title" autoComplete="off"
              {...register("title", { required: true })} />
          </div>

          <div className="group">
            <label htmlFor="content">Descrição:</label>
            <input type="text" className="input" id="content" autoComplete="off"
              {...register("content", { required: true })} />
          </div>

          <div className="group">
            <label htmlFor="date">Dia:</label>
            <input type="date" className="input" id="date"
              {...register("date", { required: true })} />
          </div>

          <div className="double-column">
            <div className="group">
              <label htmlFor="hourStart">Inicia:</label>
              <input type="time" className="input" id="hourStart"
                {...register("hourStart", { required: true })} />
            </div>

            <div className="group">
              <label htmlFor="hourEnd">Encerra:</label>
              <input type="time" className="input" id="hourEnd"
                {...register("hourEnd", { required: true })} />
            </div>
          </div>

          <div className="double-column">
            <button type="submit" className="button" disabled={loading}>
              {loading ?
                "Carregando..." :
                <>
                  Editar
                  <img src={IconAdd} className="icon" />
                </>}
            </button>

            <button type="button" className="button" onClick={() => close()}>
              Fechar
              <img src={IconClose} className="icon" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

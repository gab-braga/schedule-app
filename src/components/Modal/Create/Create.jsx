import { getNextDay, getNextWeek } from "../../../helpr/date.js";
import { create, createAll } from "../../../firebase/firestore.js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/Auth.jsx";

import IconAdd from "../../../assets/icons/add.svg";
import IconClose from "../../../assets/icons/close.svg";

import "../Modal.css";

export default ({ close, update }) => {
  const { handleSubmit, register } = useForm();
  const [repeat, setRepeat] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  function handleRepeat({ target }) {
    const { checked } = target;
    setRepeat(checked);
  }

  async function send(data) {
    setLoading(true);
    if (!repeat) await saveTask({...data, origin: true});
    else switch (data.repeatMode) {
      case "daily":
        await saveTasksDaily(data, data.times);
        break;
      case "weekly":
        await saveTasksWeekly(data, data.times);
        break;
    }
    setLoading(false);
    update();
    close();
  }

  async function saveTasksDaily(data, times) {
    const { id } = await saveTask({...data, origin: true});
    const tasks = [];
    for (let count = 1; count < times; count++) {
      const date = getNextDay(data.date, count);
      tasks.push({ ...data, date, originId: id });
    }
    await saveAllTasks(tasks);
  }

  async function saveTasksWeekly(data, times) {
    const { id } = await saveTask({...data, origin: true});
    const tasks = [];
    for (let count = 1; count < times; count++) {
      const date = getNextWeek(data.date, count);
      tasks.push({ ...data, date, originId: id });
    }
    await saveAllTasks(tasks);
  }

  async function saveTask(data) {
    const task = prepareTask(data);
    return await create("tasks", task);
  }

  async function saveAllTasks(data) {
    const tasks = [];
    if (Array.isArray(data))
      for (const item of data) {
        tasks.push(prepareTask(item));
      }
    return await createAll("tasks", tasks);
  }

  function prepareTask(data) {
    const { title, content, date, hourStart, hourEnd } = data;
    const task = {
      userId: user.uid,
      inserted: new Date(Date.now()),
      done: false,
      isUpdated: false,
      title, content, date,
      hourStart, hourEnd
    };
    if ('origin' in data) task.origin = data.origin;
    if ('originId' in data) task.originId = data.originId;
    return task;
  }

  return (
    <div className="bg-modal">
      <div className="modal">
        <h2>Nova Tarefa</h2>
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

          <div className="group-inline">
            <label htmlFor="repet">Repetir:</label>
            <input type="checkbox" id="repet" onChange={handleRepeat} />
          </div>

          {repeat && (
            <div className="double-column">
              <div className="group">
                <div className="group-inline">
                  <label htmlFor="daily">Diariamente:</label>
                  <input type="radio" id="daily" defaultValue="daily"
                    {...register("repeatMode", { required: true })} /> <br />
                </div>

                <div className="group-inline">
                  <label htmlFor="weekly">Semanalmente:</label>
                  <input type="radio" id="weekly" defaultValue="weekly"
                    {...register("repeatMode", { required: true })} />
                </div>

              </div>
              <div className="group">
                <label htmlFor="times">Quantidade:</label>
                <input type="number" className="input" id="times"
                  {...register("times", { required: true })} />
              </div>
            </div>
          )}

          <div className="double-column">
            <button type="submit" className="button" disabled={loading}>
              {loading ?
                "Carregando..." :
                <>
                  Adicionar
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

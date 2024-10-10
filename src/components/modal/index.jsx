import "./style.css";
import { create } from "../../firebase/firestore.js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth.jsx";
import { getNextDay, getNextWeek } from "../../helpr/date.js";

import IconAdd from "../../assets/icons/add.svg";
import IconClose from "../../assets/icons/close.svg";

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
    if (!repeat) await saveTask({ ...data, origin: true });
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
    const { id } = await saveTask({ ...data, origin: true });
    for (let count = 1; count < times; count++) {
      const date = getNextDay(data.date, count);
      await saveTask({ ...data, date, originId: id });
    }
  }

  async function saveTasksWeekly(data, times) {
    const { id } = await saveTask({ ...data, origin: true });
    for (let count = 1; count < times; count++) {
      const date = getNextWeek(data.date, count);
      await saveTask({ ...data, date, originId: id });
    }
  }

  async function saveTask(data) {
    const { title, content, date, hourStart, hourEnd } = data;
    const taskData = {
      userId: user.uid,
      inserted: new Date(Date.now()),
      done: false,
      title, content, date, hourStart, hourEnd
    };
    if ('origin' in data) taskData.origin = data.origin;
    if ('originId' in data) taskData.originId = data.originId;
    return await create("tasks", taskData);
  }

  return (
    <div className="bg-modal">
      <div className="modal">
        <h2>Nova Tarefa</h2>
        <form className="form" onSubmit={handleSubmit(send)}>
          <div className="group">
            <label htmlFor="title">Tarefa:</label>
            <input type="text" className="input" id="title"
              {...register("title", { required: true })} />
          </div>

          <div className="group">
            <label htmlFor="content">Descrição:</label>
            <input type="text" className="input" id="content"
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
            <button type="submit" className="btn" disabled={loading}>
              {loading ?
                "Carregando..." :
                <>
                  Adicionar
                  <img src={IconAdd} />
                </>}
            </button>
            <button type="button" className="btn" onClick={() => close()}>
              Fechar
              <img src={IconClose} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import "./style.css";
import { create } from "../../firebase/firestore.js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth.jsx";
import { getNextWeek } from "../../helpr/date.js";

export default ({ close, update }) => {
  const { handleSubmit, register } = useForm();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  async function send(data) {
    setLoading(true);
    if (!data.repet) await saveTask(data);
    else await saveTasksRepeatedly(data, data.times);
    setLoading(false);
    update();
    close();
  }

  async function saveTasksRepeatedly(data, times) {
    const { id } = await saveTask({ ...data });
    for (let i = 1; i < times; i++) {
      const date = getNextWeek(data.date, i);
      await saveTask({ ...data, date, firstId: id });
    }
  }

  async function saveTask({
    title, content, date, hourStart, hourEnd, firstId
  }) {
    const { uid } = user;
    const taskData = {
      userId: uid,
      done: false,
      title, content, date,
      hourStart, hourEnd,
      firstId: firstId || null,
      inserted: new Date(Date.now()),
    };
    return await create("tasks", taskData);
  }

  return (
    <div className="bg-modal">
      <div className="modal">
        <h2>Nova Tarefa</h2>
        <form className="form" onSubmit={handleSubmit(send)}>
          <label htmlFor="title">Tarefa:</label>
          <input type="text" className="input" id="title" {...register("title", { required: true })} />

          <label htmlFor="content">Descrição:</label>
          <input type="text" className="input" id="content" {...register("content", { required: true })} />

          <label htmlFor="date">Dia:</label>
          <input type="date" className="input" id="date" {...register("date", { required: true })} />

          <div className="double-column">
            <div>
              <label htmlFor="hourStart">Inicia:</label>
              <input type="time" className="input" id="hourStart" {...register("hourStart", { required: true })} />
            </div>
            <div>
              <label htmlFor="hourEnd">Encerra:</label>
              <input type="time" className="input" id="hourEnd" {...register("hourEnd", { required: true })} />
            </div>
          </div>

          <div className="double-column">
            <div>
              <label htmlFor="repet">Repetir:</label>
              <input type="checkbox" id="repet" {...register("repet")} />
            </div>
            <div>
              <label htmlFor="times">Quant:</label>
              <input type="number" className="input" id="times" {...register("times")} />
            </div>
          </div>

          <div className="double-column">
            <button type="submit" className="btn">
              {loading ? "Carregando..." : "Adicionar"}
            </button>
            <button type="button" className="btn" onClick={() => close()}>Fechar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

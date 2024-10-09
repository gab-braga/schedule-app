import "./style.css";
import { create } from "../../firebase/firestore.js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth.jsx";

export default ({ close, update }) => {
  const { handleSubmit, register } = useForm();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  async function send({
    title,
    content,
    date,
    hourStart,
    hourEnd,
    repet,
  }) {
    setLoading(true);
    const { uid } = user;
    const taskData = {
      userId: uid,
      done: false,
      title,
      content,
      date,
      hourStart,
      hourEnd,
      repet,
      inserted: new Date(Date.now()),
    };
    await create("tasks", taskData);
    setLoading(false);
    update();
    close();
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

          <div>
            <label htmlFor="repet">Repetir:</label>
            <input type="checkbox" id="repet" {...register("repet")} />
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

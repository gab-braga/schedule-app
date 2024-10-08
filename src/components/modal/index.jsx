import './style.css';
import { create } from '../../firebase/firestore.js';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/auth.jsx';

export default ({ close, update }) => {
  const { handleSubmit, register } = useForm();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  async function send({ content }) {
    setLoading(true);
    const now = Date.now();
    const { uid } = user;
    const taskData = {
      userId: uid,
      content,
      time: now,
      date: new Date(now),
      done: false
    };
    await create('tasks', taskData);
    setLoading(false);
    update();
    close();
  }

  return (
    <div className="bg-modal">
      <div className="modal">
        <h2>Nova Tarefa</h2>
        <form className="form" onSubmit={handleSubmit(send)}>
          <label htmlFor="content">Tarefa:</label>
          <input type="text" {...register("content", { required: true })} />
          <div className="control">
            <button type="submit" className="btn">{loading ? "Carregando..." : "Adicionar"}</button>
            <button type="button" className="btn" onClick={() => close()}>
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

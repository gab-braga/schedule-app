import './style.css';
import { create } from '../../firebase/firestore.js';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default ({ close, update }) => {
  const { handleSubmit, register } = useForm();
  const [loading, setLoading] = useState(false);

  function send({ content }) {
    setLoading(true);
    const now = Date.now();
    const taskData = {
      content,
      time: now,
      date: new Date(now),
      done: false,
    };
    create('tasks', taskData).then(() => {
      setLoading(false);
      update();
      close();
    });
  }

  return (
    <div className="bg-modal">
      <div className="modal">
        <h2>Nova Tarefa</h2>
        <form onSubmit={handleSubmit(send)}>
          <label htmlFor="content">Tarefa:</label>
          <input type="text" {...register('content', { required: true })} />
          <div className="control">
            <button type='submit' className='btn'>{loading ? 'Carregando...' : 'Adicionar'}</button>
            <button type="button" className='btn' onClick={() => close()}>
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

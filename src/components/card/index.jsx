import { useEffect, useState } from 'react';
import { closeById, deleteById } from '../../firebase/firestore';
import './style.css';

export default ({ id, content, time, done, update }) => {
  function formatDate(date) {
    return new Date(date).toLocaleString('pt-br');
  }

  async function remove() {
    await deleteById('tasks', id);
    update();
  }

  async function close() {
    await closeById('tasks', id, { content, time, done: true });
    update();
  }

  return (
    <div className={done ? 'card done' : 'card'}>
      <small>{formatDate(time)}</small>
      <div className="content">
        <p>{content}</p>
      </div>
      <div className="control">
        {!done && <button onClick={close}>Concluir</button>}
        <button onClick={remove}>Remover</button>
      </div>
    </div>
  );
};

import './style.css';
import { useEffect, useState } from 'react';
import { findAll } from '../../firebase/firestore';
import Modal from '../../components/modal';
import Header from '../../components/header';
import Card from '../../components/card';

export default () => {
  const [modal, setModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  async function loadTasks() {
    const data = await findAll('tasks', 'date');
    setTasks(data);
  }

  function openModal() {
    setModal(true);
  }

  function closeModal() {
    setModal(false);
  }

  function updateData() {
    loadTasks();
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="home">
      {modal && <Modal close={closeModal} update={updateData} />}
      <Header action={openModal} />
      <div className="tasks">
        {tasks.map((task, idx) => (
          <Card {...task} key={idx} update={updateData} />
        ))}
      </div>
    </div>
  );
};

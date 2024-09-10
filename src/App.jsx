import './App.css';
import Header from './components/header';
import Modal from './components/modal';
import Home from './pages/home';
import { useEffect, useState } from 'react';
import { findAll } from './firebase/firestore';

function App() {
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
    <div className="root">
      {modal && <Modal close={closeModal} update={updateData} />}
      <Header action={openModal} />
      <Home tasks={tasks} update={updateData} />
    </div>
  );
}

export default App;

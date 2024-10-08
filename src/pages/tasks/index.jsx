import "./style.css";
import { useEffect, useState } from "react";
import { findAll } from "../../firebase/firestore";
import Modal from "../../components/modal";
import Header from "../../components/header";
import Card from "../../components/card";
import { useAuth } from "../../context/auth";
import { Navigate } from "react-router-dom";

export default () => {
  const [modal, setModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { isAuthenticated, user } = useAuth();

  async function loadTasks() {
    const data = await findAll(user.uid, "tasks", "date");
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
    if (user) loadTasks();
  }, [user]);

  if (!isAuthenticated) return <Navigate to="/signin" />;

  return (
    <div className="tasks">
      {modal && <Modal close={closeModal} update={updateData} />}
      <Header action={openModal} />
      <div className="panel">
        <div className="container grid">
          {tasks.map((task, idx) => (
            <Card {...task} key={idx} update={updateData} />
          ))}
        </div>
      </div>
    </div>
  );
};

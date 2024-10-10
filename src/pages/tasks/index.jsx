import "./style.css";
import { findTasksByUser } from "../../service/task";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Navigate } from "react-router-dom";
import Modal from "../../components/modal";
import Header from "../../components/header";
import Card from "../../components/card";

export default () => {
  const [modal, setModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { isAuthenticated, user } = useAuth();

  async function loadData() {
    const data = await findTasksByUser(user.uid);
    setTasks(data);
  }

  function openModal() {
    setModal(true);
  }

  function closeModal() {
    setModal(false);
  }

  function updateData() {
    loadData();
  }

  useEffect(() => {
    if (user) loadData();
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

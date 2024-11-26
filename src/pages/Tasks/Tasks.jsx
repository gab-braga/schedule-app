import { findTasksByUser } from "../../service/task";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import { Navigate } from "react-router-dom";
import ModalCreate from "../../components/Modal/Create/Create";
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";

import "./Tasks.css";

export default () => {
  const [modalCreate, setModalCreate] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { isAuthenticated, user } = useAuth();

  async function loadData() {
    const data = await findTasksByUser(user.uid);
    setTasks(data);
  }

  function openModalCreate() {
    setModalCreate(true);
  }

  function closeModalCreate() {
    setModalCreate(false);
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
      {modalCreate && <ModalCreate close={closeModalCreate} update={updateData} />}

      <Header action={openModalCreate} />

      <div className="tasks-panel">
        <div className="container tasks-grid">
          {tasks.map((task, idx) => (
            <Card {...task} key={idx} update={updateData} />
          ))}
        </div>
      </div>
    </div>
  );
};

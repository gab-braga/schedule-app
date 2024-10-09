import "./style.css";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import Day from "../../components/day";
import { useAuth } from "../../context/auth";
import { Navigate } from "react-router-dom";
import Modal from "../../components/modal";

function getCurrentWeekDays() {
    const today = new Date(Date.now());
    const daysOfWeek = [];

    const dayOfMonth = today.getDate();
    const dayOfWeek = today.getDay();
    const firstDayOfWeek = dayOfMonth - dayOfWeek + 1;
    const startDate = new Date(today.setDate(firstDayOfWeek));

    for (let i = 0; i < 7; i++) {
        const currentDay = new Date(startDate);
        currentDay.setDate(startDate.getDate() + i);
        daysOfWeek.push(currentDay);
    }

    return daysOfWeek;
}

export default () => {
    const { isAuthenticated } = useAuth();
    const [modal, setModal] = useState(false);
    const [week, setWeek] = useState([]);

    function openModal() {
      setModal(true);
    }
  
    function closeModal() {
      setModal(false);
    }

    function updateWeek() {
        setWeek(getCurrentWeekDays());
    }

    useEffect(() => {
        updateWeek();
    }, []);

    if (!isAuthenticated) return <Navigate to="/signin" />;

    return (
        <div className="schedule">
            {modal && <Modal close={closeModal} update={updateWeek} />}
            <Header action={openModal} />
            <div className="panel">
                <div className="container control">
                    <button className="btn sm">Anterior</button>
                    <button className="btn sm">Próximo</button>
                </div>
                <div className="container week">
                    {week.map((day, idx) => <Day day={day} key={idx} />)}
                </div>
            </div>
        </div>
    );
}
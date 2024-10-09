import "./style.css";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import Day from "../../components/day";
import { useAuth } from "../../context/auth";
import { Navigate } from "react-router-dom";
import Modal from "../../components/modal";
import { getCurrentWeekDays } from "../../helpr/date";

export default () => {
    const [weekNumber, setWeekNumber] = useState(0);
    const [week, setWeek] = useState([]);
    const [modal, setModal] = useState(false);
    const { isAuthenticated } = useAuth();

    function openModal() {
      setModal(true);
    }
  
    function closeModal() {
      setModal(false);
    }

    function updateWeek() {
        setWeek(getCurrentWeekDays(weekNumber));
    }

    useEffect(() => {
        updateWeek();
    }, [weekNumber]);

    if (!isAuthenticated) return <Navigate to="/signin" />;

    return (
        <div className="schedule">
            {modal && <Modal close={closeModal} update={updateWeek} />}
            <Header action={openModal} />
            <div className="panel">
                <div className="container control">
                    <button className="btn sm" onClick={() => {
                        setWeekNumber(num => num - 1);
                    }}>Anterior</button>
                    <button className="btn sm" onClick={() => {
                        setWeekNumber(num => num + 1);
                    }}>Próximo</button>
                </div>
                <div className="container week">
                    {week.map((day, idx) => <Day day={day} key={idx} />)}
                </div>
            </div>
        </div>
    );
}
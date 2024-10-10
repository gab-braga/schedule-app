import "./style.css";
import { getCurrentWeekDays } from "../../helpr/date";
import { useAuth } from "../../context/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Modal from "../../components/modal";
import Header from "../../components/header";
import Day from "../../components/day";

import IconArrowBack from "../../assets/icons/arrow_back.svg";
import IconArrowForward from "../../assets/icons/arrow_forward.svg";

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

    function nextWeek() {
        setWeekNumber(num => num + 1);
    }

    function backWeek() {
        setWeekNumber(num => num - 1);
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
                    <button className="btn sm" onClick={backWeek}>
                        <img src={IconArrowBack} className="icon" />
                        Anterior
                    </button>

                    <button className="btn sm" onClick={nextWeek}>
                        Próximo
                        <img src={IconArrowForward} className="icon" />
                    </button>
                </div>
                
                <div className="container week">
                    {week.map((day, idx) => <Day day={day} key={idx} />)}
                </div>
            </div>
        </div>
    );
}
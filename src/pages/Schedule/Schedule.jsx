import { getCurrentWeekDays } from "../../helpr/date";
import { useAuth } from "../../context/Auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ModalCreate from "../../components/Modal/Create/Create";
import Header from "../../components/Header/Header";
import Day from "../../components/Day/Day";

import IconArrowBack from "../../assets/icons/arrow_back.svg";
import IconArrowForward from "../../assets/icons/arrow_forward.svg";

import "./Schedule.css";

export default () => {
    const [weekNumber, setWeekNumber] = useState(0);
    const [week, setWeek] = useState([]);
    const [modalCreate, setModalCreate] = useState(false);
    const { isAuthenticated } = useAuth();

    function openModalCreate() {
      setModalCreate(true);
    }
  
    function closeModalCreate() {
      setModalCreate(false);
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
            {modalCreate && <ModalCreate close={closeModalCreate} update={updateWeek} />}

            <Header action={openModalCreate} />

            <div className="schedule-panel">
                <div className="schedule-control">
                    <button className="button" onClick={backWeek}>
                        <img src={IconArrowBack} className="icon" />
                        Anterior
                    </button>

                    <button className="button" onClick={nextWeek}>
                        Próximo
                        <img src={IconArrowForward} className="icon" />
                    </button>
                </div>
                
                <div className="schedule-week">
                    {week.map((day, idx) => <Day day={day} key={idx} />)}
                </div>
            </div>
        </div>
    );
}
import "./style.css";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import Day from "../../components/day";

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

    const [week, setWeek] = useState([]);

    useEffect(() => {
        setWeek(getCurrentWeekDays());
    }, [])

    return (
        <div className="schedule">
            <Header />
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
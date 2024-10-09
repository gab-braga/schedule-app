import { useEffect, useState } from "react";
import "./style.css";
import { findByCondition } from "../../firebase/firestore";

function formatDayOfWeek(date) {
    const options = { weekday: "long" };
    const dateString = date.toLocaleDateString("pt-BR", options);
    const dayString = dateString.slice(0, 3).toUpperCase();
    const dayNumber = date.getDate();
    return `${dayString} / ${dayNumber}`;
}

function checkToday(day) {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    const formattedDate = day.toISOString().split("T")[0];
    return (formattedToday === formattedDate);
}

function formatDateToString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export default ({ day }) => {
    const [isToday, setIsToday] = useState(false);
    const [tasks, setTasks] = useState([]);

    async function loadData() {
        const date = formatDateToString(day);
        const data = await findByCondition("tasks", "date", date, "hourStart");
        setTasks(data);
    }

    useEffect(() => {
        loadData();
        setIsToday(checkToday(day));
    }, [day]);

    return (
        <div className={isToday ? "day today" : "day"}>
            <span className="flag"></span>
            <span className="title">
                {formatDayOfWeek(day)}
            </span>
            <div className="items">
                {tasks.map(({title, hourStart, hourEnd}, idx) => {
                    return (
                        <div className="task" key={idx}>
                            <div className="hours">
                                {hourStart} - {hourEnd}
                            </div>
                            <span className="description">{title}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
import { useEffect, useState } from "react";
import "./style.css";
import { findByCondition } from "../../firebase/firestore";
import { checkToday, formatDateToString, formatDayOfWeek } from "../../helpr/date";

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
import "./style.css";
import { useEffect, useState } from "react";
import { checkToday, formatDateToString, formatDayOfWeek } from "../../helpr/date";
import { findScheduleByUser } from "../../service/task";
import { useAuth } from "../../context/auth";

export default ({ day }) => {
    const [isToday, setIsToday] = useState(false);
    const [tasks, setTasks] = useState([]);
    const { user } = useAuth();

    async function loadData() {
        const date = formatDateToString(day);
        const data = await findScheduleByUser(user.uid, date);
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
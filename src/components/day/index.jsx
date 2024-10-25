import "./style.css";
import { useEffect, useState } from "react";
import { checkToday, formatDateToString, formatDayOfWeek } from "../../helpr/date";
import { deleteTask, findScheduleByUser, updateTask } from "../../service/task";
import { useAuth } from "../../context/auth";

import IconDelete from "../../assets/icons/delete.svg";
import IconCheck from "../../assets/icons/check.svg";
import IconRefresh from "../../assets/icons/refresh.svg";

export default ({ day }) => {
    const [isToday, setIsToday] = useState(false);
    const [tasks, setTasks] = useState([]);
    const { user } = useAuth();

    async function loadData() {
        const date = formatDateToString(day);
        const data = await findScheduleByUser(user.uid, date);
        setTasks(data);
    }

    async function handlDeleteTask(id) {
        deleteTask(id);
        loadData();
    }

    async function handleCompleteTask(id) {
        updateTask(id, { done: true });
        loadData();
    }

    async function handleOpenTask(id) {
        updateTask(id, { done: false });
        loadData();
    }

    useEffect(() => {
        loadData();
        setIsToday(checkToday(day));
    }, [day]);

    return (
        <div className={isToday ? "day today" : "day"}>
            <span className="day-flag"></span>
            <span className="day-title">
                {formatDayOfWeek(day)}
            </span>

            <div className="day-items">
                {tasks.map(({ id, done, title, hourStart, hourEnd }, idx) => {
                    return (
                        <div className={done ? "task done" : "task"} key={idx}>
                            <div className="task-hours">{hourStart} - {hourEnd}</div>
                            <span className="task-title">{title}</span>
                            <div className="task-control">
                                <button className="btn-icon" onClick={() => handlDeleteTask(id)}>
                                    <img src={IconDelete} />
                                </button>
                                {done ? (
                                    <button className="btn-icon" onClick={() => handleOpenTask(id)}>
                                        <img src={IconRefresh} />
                                    </button>
                                ) : (
                                    <button className="btn-icon" onClick={() => handleCompleteTask(id)}>
                                        <img src={IconCheck} />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
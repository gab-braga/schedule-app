import "./style.css";
import { useEffect, useState } from "react";
import { checkToday, formatDateToString, formatDayOfWeek } from "../../helpr/date";
import { deleteTask, findScheduleByUser, updateTask } from "../../service/task";
import { useAuth } from "../../context/auth";

import IconCheck from "../../assets/icons/check.svg";
import IconDelete from "../../assets/icons/delete.svg";

export default ({ day }) => {
    const [isToday, setIsToday] = useState(false);
    const [tasks, setTasks] = useState([]);
    const { user } = useAuth();

    async function loadData() {
        const date = formatDateToString(day);
        const data = await findScheduleByUser(user.uid, date);
        setTasks(data);
    }

    async function handleCompleteTask(id) {
        updateTask(id, { done: true });
        loadData();
    }

    async function handlDeleteTask(id) {
        deleteTask(id);
        loadData();
    }

    useEffect(() => {
        loadData();
        setIsToday(checkToday(day));
    }, [day]);

    return (
        <div className={isToday ? "day today" : "day"}>
            <span className="flag"></span>
            <span className="week-title">
                {formatDayOfWeek(day)}
            </span>

            <div className="items">
                {tasks.map(({ id, done, origin, title, hourStart, hourEnd }, idx) => {
                    return (
                        <div className={done ? "task done" : "task"} key={idx}>
                            <div className="hours">{hourStart} - {hourEnd}</div>
                            <span className="title">{title}</span>

                            {!origin && (
                                <div className="control">
                                    <button className="btn-icon" onClick={() => handlDeleteTask(id)}>
                                        <img src={IconDelete} />
                                    </button>

                                    {!done && (
                                        <button className="btn-icon" onClick={() => handleCompleteTask(id)}>
                                            <img src={IconCheck} />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
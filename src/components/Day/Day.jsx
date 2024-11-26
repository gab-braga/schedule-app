import { useEffect, useState } from "react";
import { checkToday, formatDateToString, formatDayOfWeek } from "../../helpr/date";
import { deleteTask, findScheduleByUser, updateTask } from "../../service/task";
import { useAuth } from "../../context/Auth";
import ModalEdit from "../../components/Modal/Edit/Edit";

import IconDelete from "../../assets/icons/delete.svg";
import IconCheck from "../../assets/icons/check.svg";
import IconRefresh from "../../assets/icons/refresh.svg";
import IconEdit from "../../assets/icons/edit.svg";

import "./Day.css";

export default ({ day }) => {
    const [isToday, setIsToday] = useState(false);
    const [tasks, setTasks] = useState([]);
    const { user } = useAuth();

    async function loadData() {
        const date = formatDateToString(day);
        const data = await findScheduleByUser(user.uid, date);
        setTasks(data);
    }

    const handlDeleteTask = async (id) => {
        deleteTask(id);
        loadData();
    }

    const handleCompleteTask = async (id) => {
        updateTask(id, { done: true });
        loadData();
    }

    const handleOpenTask = async (id) => {
        updateTask(id, { done: false });
        loadData();
    }

    const handleUpdateTask = async (id) => {
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
                {tasks.map(task => (
                    <TaskItem key={task.id} {...{
                        ...task,
                        handlDeleteTask,
                        handleCompleteTask,
                        handleOpenTask,
                        handleUpdateTask
                    }} />
                ))}
            </div>
        </div>
    );
}

function TaskItem({
    id, title, done,
    hourStart, hourEnd,
    handlDeleteTask,
    handleOpenTask,
    handleCompleteTask,
    handleUpdateTask
}) {
    const [modalEdit, setModalEdit] = useState(false);

    function openModalEdit() {
        setModalEdit(true);
    }

    function closeModalEdit() {
        setModalEdit(false);
    }

    return (
        <div className={done ? "task done" : "task"}>

            {modalEdit && <ModalEdit taskId={id} close={closeModalEdit} update={handleUpdateTask} />}

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
                <button className="btn-icon" onClick={() => openModalEdit()}>
                    <img src={IconEdit} />
                </button>
            </div>
        </div>
    );
}
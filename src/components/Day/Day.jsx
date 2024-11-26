import { useEffect, useState } from "react";
import { checkToday, formatDateToString, formatDayOfWeek } from "../../helpr/date";
import { deleteTask, duplicateTask, updateTask, findScheduleByUser } from "../../service/task";
import { useAuth } from "../../context/Auth";
import ModalEdit from "../../components/Modal/Edit/Edit";

import IconDelete from "../../assets/icons/delete.svg";
import IconCheck from "../../assets/icons/check.svg";
import IconRefresh from "../../assets/icons/refresh.svg";
import IconEdit from "../../assets/icons/edit.svg";
import IconCopy from "../../assets/icons/copy.svg";

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

    async function handleDeleteTask(id) {
        const confirm = window.confirm("Deseja excluir?");
        if (confirm) {
            await deleteTask(id);
            loadData();
        }
    }

    async function handleCompleteTask(id) {
        await updateTask(id, { done: true });
        loadData();
    }

    async function handleOpenTask(id) {
        await updateTask(id, { done: false });
        loadData();
    }

    async function handleDuplicateTask(id) {
        window.alert(id)
        await duplicateTask(id);
        loadData();
    }

    async function handleUpdateTask() {
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
                        handleDeleteTask,
                        handleCompleteTask,
                        handleOpenTask,
                        handleDuplicateTask,
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
    handleDeleteTask,
    handleOpenTask,
    handleCompleteTask,
    handleDuplicateTask,
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
                <button className="btn-icon" onClick={() => handleDeleteTask(id)}>
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
                <button className="btn-icon" onClick={() => handleDuplicateTask(id)}>
                    <img src={IconCopy} />
                </button>
                <button className="btn-icon" onClick={() => openModalEdit()}>
                    <img src={IconEdit} />
                </button>
            </div>
        </div>
    );
}
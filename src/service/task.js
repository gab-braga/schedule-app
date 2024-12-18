import {
    find,
    findByFilters,
    deleteById,
    updateById,
    deleteByFilters,
    updateByFilters,
    create
} from "../firebase/firestore";

async function findTask(id) {
    return await find("tasks", id);
}

async function findTasksByUser(userId) {
    const filters = [
        { field: "userId", op: "==", value: userId },
        { field: "origin", op: "==", value: true }
    ];
    const order = { field: "inserted", sort: "desc" }
    return await findByFilters("tasks", filters, order);
}

async function findScheduleByUser(userId, date) {
    const filters = [
        { field: "userId", op: "==", value: userId },
        { field: "date", op: "==", value: date }
    ];
    const order = { field: "hourStart", sort: "asc" }
    return await findByFilters("tasks", filters, order);
}

async function deleteTask(id) {
    await deleteById("tasks", id);
}

async function duplicateTask(id) {
    const task = await find("tasks", id);
    const duplicated = {...task, done: false, isUpdated: false};
    delete duplicated.id;

    if (task.origin) {
        delete duplicated.origin;
        duplicated.originId = task.id;
    }
    else duplicated.originId = task.originId;
    
    await create("tasks", duplicated);
}

async function updateTask(id, data) {
    await updateById("tasks", id, data);
}

async function deleteAllTasks(id) {
    const filters = [
        { field: "originId", op: "==", value: id },
        { field: "isUpdated", op: "==", value: false }
    ];
    await deleteByFilters("tasks", filters);
}

async function updateAllTasks(id, data) {
    const filters = [
        { field: "originId", op: "==", value: id },
        { field: "isUpdated", op: "==", value: false }
    ];
    await updateByFilters("tasks", filters, data);
}

export {
    findTask,
    findTasksByUser,
    findScheduleByUser,
    deleteTask,
    updateTask,
    deleteAllTasks,
    duplicateTask,
    updateAllTasks
};
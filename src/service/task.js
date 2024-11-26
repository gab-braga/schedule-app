import {
    deleteByFilters,
    deleteById,
    find,
    findByConditions,
    updateByFilters,
    updateById
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
    return await findByConditions("tasks", filters, order);
}

async function findScheduleByUser(userId, date) {
    const filters = [
        { field: "userId", op: "==", value: userId },
        { field: "date", op: "==", value: date }
    ];
    const order = { field: "hourStart", sort: "asc" }
    return await findByConditions("tasks", filters, order);
}

async function deleteTask(id) {
    await deleteById("tasks", id);
}

async function updateTask(id, data) {
    await updateById("tasks", id, data);
}

export {
    findTask,
    findTasksByUser,
    findScheduleByUser,
    deleteTask,
    updateTask
};
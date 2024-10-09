import {
    deleteByFilters,
    deleteById,
    findByConditions,
    updateByFilters,
    updateById
} from "../firebase/firestore";

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
    const filters = [{ field: "originId", op: "==", value: id }];
    await deleteById("tasks", id);
    await deleteByFilters("tasks", filters);
}

async function updateTask(id, data) {
    const filters = [{ field: "originId", op: "==", value: id }];
    await updateById("tasks", id, data);
    await updateByFilters("tasks", filters, data);
}

export {
    findTasksByUser,
    findScheduleByUser,
    deleteTask,
    updateTask
};
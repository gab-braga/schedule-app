import { findByConditions } from "../firebase/firestore";

async function findTasksByUser(userId) {
    const filters = [
        { field: "userId", op: "==", value: userId },
        { field: "firstId", op: "==", value: null }
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

export { findTasksByUser, findScheduleByUser };
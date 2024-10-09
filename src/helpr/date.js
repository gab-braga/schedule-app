function formatLocalDate(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
}

function formatDateToString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDayOfWeek(date) {
    const options = { weekday: "long" };
    const dateString = date.toLocaleDateString("pt-BR", options);
    const dayString = dateString.slice(0, 3).toUpperCase();
    const dayNumber = date.getDate();
    return `${dayString} / ${dayNumber}`;
}

function checkToday(date) {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    const formattedDate = date.toISOString().split("T")[0];
    return (formattedToday === formattedDate);
}

function getDate(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return new Date(year, (month - 1), day);
}

function getNextDay(dateStr, skip) {
    const date = getDate(dateStr);
    const dateNextDay = new Date(date);
    const dayOfMonth = dateNextDay.getDate();
    dateNextDay.setDate(dayOfMonth + skip);
    return formatDateToString(dateNextDay);
}

function getNextWeek(dateStr, skip) {
    const date = getDate(dateStr);
    const dateNextWeek = new Date(date);
    const dayOfMonth = dateNextWeek.getDate();
    dateNextWeek.setDate(dayOfMonth + (skip * 7));
    return formatDateToString(dateNextWeek);
}

function getCurrentWeekDays(week) {
    const daysOfWeek = [];

    const date = new Date(Date.now());
    date.setDate(date.getDate() + (week * 7));

    const dayOfMonth = date.getDate();
    const dayOfWeek = date.getDay();
    const firstDayOfWeek = dayOfMonth - dayOfWeek + 1;
    const startDate = new Date(date.setDate(firstDayOfWeek));

    for (let i = 0; i < 7; i++) {
        const currentDay = new Date(startDate);
        currentDay.setDate(startDate.getDate() + i);
        daysOfWeek.push(currentDay);
    }

    return daysOfWeek;
}

export {
    formatLocalDate,
    formatDateToString,
    formatDayOfWeek,
    checkToday,
    getDate,
    getNextDay,
    getNextWeek,
    getCurrentWeekDays
};
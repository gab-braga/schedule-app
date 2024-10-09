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

function getNextWeek(dateStr, skip) {
    const date = new Date(dateStr);
    const dateNextWeek = new Date(date);
    dateNextWeek.setDate(date.getDate() + (8 * skip));
    return formatDateToString(dateNextWeek);
}

export { formatLocalDate, formatDateToString, formatDayOfWeek, checkToday, getNextWeek };
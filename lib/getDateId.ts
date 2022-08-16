export function getDateId(date: Date) {
    return date.getFullYear() * 12 + date.getMonth();
}
export default class MonthBalance {
    id: number
    isPreviousMonthMoved: boolean = false;
    constructor(year: number, month: number) {
        this.id = year * 12 + month;
    }
}
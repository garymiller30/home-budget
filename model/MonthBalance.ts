import { ObjectId } from "mongodb";

export interface IMonthBalanceParams {
    userId: string;
    year: number;
    month: number;
}

export default class MonthBalance {
    _id?: ObjectId;
    id: number
    userId: string
    isPreviousMonthMoved: boolean = false;
    constructor({ userId, year, month }: IMonthBalanceParams) {
        this.userId = userId;
        this.id = year * 12 + month;
    }
}
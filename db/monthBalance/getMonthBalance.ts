import MonthBalance from "../../model/MonthBalance";
import { getCollection } from "../getCollection";

export interface IGetMonthBalanceParams {
    userId: string;
    year: number;
    month: number;
    curYear: number;
    curMonth: number;
}

export default async function getMonthBalance({ userId, year, month, curYear, curMonth }: IGetMonthBalanceParams) {
    const collection = await getCollection("monthBalance");

    const curId = curYear * 12 + curMonth;

    const id: number = year * 12 + month;

    let mb: MonthBalance = new MonthBalance({ userId, year, month });

    //якщо це минулі місяці, то до бази не звертаємось, а вертаємо пустишку
    if (id < curId) {
        mb.isPreviousMonthMoved = true;
    }
    else {
        //якщо поточний місяць, то шукаємо в базі
        const filter = { id, userId };
        const res = await collection.findOne(filter) as any;
        // такого запису нема, потрібно створити
        if (!res) {
            await collection.insertOne(mb);
        }
        else {
            mb = res;
        }

    }


    return JSON.parse(JSON.stringify(mb));
}
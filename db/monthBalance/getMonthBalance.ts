import MonthBalance from "../../model/MonthBalance";
import { getCollection } from "../getCollection";

export default async function getMonthBalance(year: number, month: number) {
    const collection = await getCollection("monthBalance");

    const curDate = new Date();
    const curYear = curDate.getFullYear();
    const curMonth = curDate.getMonth();

    const curId = curYear * 12 + curMonth;

    const id: number = year * 12 + month;

    let mb: MonthBalance = new MonthBalance(year, month);

    //якщо це минулі місяці, то до бази не звертаємось, а вертаємо пустишку
    if (id < curId) {
        mb.isPreviousMonthMoved = true;
    }
    else {
        //якщо поточний місяць, то шукаємо в базі
        const filter = { id: id };

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
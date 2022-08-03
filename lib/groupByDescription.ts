import { iReportListItem } from "@/interfaces/iReportListItem";
import { iTransaction } from "@/interfaces/iTransaction";

export default function groupByDescription(transactions: iTransaction[] = []): iReportListItem[] {

    const group = transactions.reduce((acc, transaction) => ({
        ...acc,
        // @ts-expect-error:
        [transaction.description.toLowerCase()]: (acc[transaction.description.toLowerCase()] + Number(transaction.amount) || Number(transaction.amount))
    }), {})

    const arr = Object.keys(group).map((key) => {
        return {
            description: key,
            // @ts-expect-error:
            amount: group[key]
        } as iReportListItem
    })
    const percentFunc = getPercent(getSum(arr))
    const withPercent = arr.map((item) => ({ ...item, percent: percentFunc(item) }))

    withPercent.sort((a, b) => b.amount - a.amount)

    return withPercent
}

function getSum(arr: iReportListItem[]) {
    return arr.reduce((sum, item) => sum + Number(item.amount), 0);
}
function getPercent(sum: number) {
    return (item: iReportListItem) => ((item.amount * 100) / sum).toFixed(1);
}
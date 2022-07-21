export const useAutoTransferBalance = () => {
    return async (id: string) => {
        const curDate = new Date();
        const curYear = curDate.getFullYear();
        const curMonth = curDate.getMonth();

        await fetch(
            `/api/monthBalance?userId=${id}&year=${curYear}&month=${curMonth}&curYear=${curYear}&curMonth=${curMonth}`
        );
    }

}
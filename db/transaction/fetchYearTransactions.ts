export default async function fetchYearTransactions(userId: string, year: number) {

    if (!userId || !year) return [];

    const response = await fetch(`/api/statistic?userId=${userId}&year=${year}`, { method: 'GET' })

    const t = await response.json();
    return t;
}
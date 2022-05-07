export async function fetchTransactions(userId: string, year: number, month: number) {
  if (!userId || !year || !month) return [];

  const response = await fetch(
    `/api/transaction?userId=${userId}&year=${year}&month=${month}`,
    {
      method: "GET",
    }
  );
  const t = await response.json();
  return t;
}

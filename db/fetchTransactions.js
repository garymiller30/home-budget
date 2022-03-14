export async function fetchTransactions({ userId = null, year, month }) {
  if (!userId) return [];

  const response = await fetch(
    `/api/transaction?userId=${userId}&year=${year}&month=${month}`,
    {
      method: "GET",
    }
  );
  const t = await response.json();
  return t;
}

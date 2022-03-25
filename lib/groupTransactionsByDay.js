export default function (transactions = []) {
  return transactions.reduce(
    (result, item) => ({
      ...result,
      [item.date.day]: [...(result[item.date.day] || []), item],
    }),
    {}
  );
}

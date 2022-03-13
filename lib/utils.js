export function groupBy(items, key) {
  return items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  );
}

export function getTransactionGroupData(group) {
  return Object.keys(group)
    .map((x) => {
      return {
        description: x,
        amount: group[x].reduce((prev, next) => prev + Number(next.amount), 0),
      };
    })
    .sort((f, s) => f.amount < s.amount);
}

export function getDataTotalAmount(data) {
  return data
    .reduce((prev, next) => {
      return prev + next.amount;
    }, 0)
    .toFixed(2);
}

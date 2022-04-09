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

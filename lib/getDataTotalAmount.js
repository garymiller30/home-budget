export function getDataTotalAmount(data) {
  return data
    .reduce((prev, next) => {
      return prev + Number(next.amount);
    }, 0)
    .toFixed(2);
}

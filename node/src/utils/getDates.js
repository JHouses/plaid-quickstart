// Get the start and end dates based on the array of transactions
const getStartAndEndDates = (transactions) => {
  if (transactions.length === 0) {
      return { startDate: null, endDate: null };
  }

  let startDate = transactions[0].date;
  let endDate = transactions[0].date;

  for (const transaction of transactions) {
      if (new Date(transaction.date) < new Date(startDate)) {
          startDate = transaction.date;
      }
      if (new Date(transaction.date) > new Date(endDate)) {
          endDate = transaction.date;
      }
  }

  return { startDate, endDate };
};

module.exports = { getStartAndEndDates };

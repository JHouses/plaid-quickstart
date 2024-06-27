const { calculateDaysBetweenDates } = require('./calculateDaysBetweenDates');

// Calculate score based on transactions
const calculateScore = (transactions, totalAvailableBalance, dates) => {
  let currentBalance = totalAvailableBalance;
  let positiveBalanceTimeInDays = 0;
  let previousDate = new Date(dates.startDate);
  const totalTimeInDays = calculateDaysBetweenDates(dates);

  transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

  transactions.forEach(transaction => {
    const daysBetweenTransactions = calculateDaysBetweenDates({
      startDate: previousDate,
      endDate: transaction.date
    });

    if (currentBalance > 0) {
      positiveBalanceTimeInDays += daysBetweenTransactions;
    }

    currentBalance += transaction.amount;
    previousDate = transaction.date;
  });

  const remainingDays = calculateDaysBetweenDates({
    startDate: previousDate, 
    endDate: new Date(dates.endDate)
  });

  if (currentBalance > 0) {
    positiveBalanceTimeInDays += remainingDays;
  }

  const positiveBalancePercentage = (positiveBalanceTimeInDays / totalTimeInDays) * 100;

  return positiveBalancePercentage;
};

module.exports = { calculateScore };

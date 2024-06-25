// Calculate score based on transactions
const calculateScore = (transactions, totalAvailableBalance) => {
  let currentBalance = totalAvailableBalance;
  let positiveBalanceTime = 0;
  let totalTime = 0;

  transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

  transactions.forEach(transaction => {
    totalTime++;
    currentBalance += transaction.amount;
    
    if (currentBalance > 0) {
      positiveBalanceTime++;
    }
  });

  const positiveBalancePercentage = (positiveBalanceTime / totalTime) * 100;

  return positiveBalancePercentage;
};

module.exports = { calculateScore };

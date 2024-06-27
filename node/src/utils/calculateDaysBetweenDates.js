// Calculate the difference in days between startDate and endDate
const calculateDaysBetweenDates = (dates) => {
  const { startDate, endDate } = dates;
  const startDateParsed = new Date(startDate);
  const endDateParsed = new Date(endDate);

  const differenceInMs = endDateParsed - startDateParsed;
  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

  return differenceInDays;
}

module.exports = { calculateDaysBetweenDates };

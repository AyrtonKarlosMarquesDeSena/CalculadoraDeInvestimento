function convertMontlyReturnRate(yearReturnRate) {
  return yearReturnRate ** (1 / 12);
}

function generateReturnsArray(
  startingAmount = 0,
  timeHorizon = 0,
  timePeriod = "monthly",
  mouthyContribution = 0,
  returnRate = 0,
  returnTimeFrame = "monthly",
) {
  if (!timeHorizon || !startingAmount) {
    throw new Error(
      "Investimento inicial e prazo devem ser preencidos com valores positivos",
    );
  }

  const finalReturnRate =
    returnTimeFrame === "monthly"
      ? 1 + returnRate / 100
      : convertMontlyReturnRate(1 + returnRate / 100);

  const finalTimeHorizon =
    timePeriod === "monthly" ? timeHorizon : timeHorizon * 12;

  const referenceInvestimentObject = {
    investedAmount: startingAmount,
    interestReturns: 0,
    totalInterestReturn: 0,
    month: 0,
    totalAmount: startingAmount,
  };

  const returnArray = [referenceInvestimentObject];
  for (
    let timeReference = 1;
    timeReference <= finalTimeHorizon;
    timeReference++
  ) {
    const totalAmount =
      returnArray[timeReference - 1].totalAmount * finalReturnRate +
      mouthyContribution;
    const interestReturns = returnArray[timeReference - 1].totalAmount * finalReturnRate
    const investedAmount = startingAmount + mouthyContribution * timeReference
    const  totalInterestReturn = totalAmount - investedAmount;
    returnArray.push({
    investedAmount,
    interestReturns,
    totalInterestReturn,
    month: timeReference,
    totalAmount,
    })
  }
  return returnArray
}

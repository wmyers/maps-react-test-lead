/**
 * Calculates the total repayment.
 * Formula: T = M * n
 *
 * @param monthlyPayment - The monthly mortgage payment.
 * @param mortgageTermInYears - The mortgage term in years.
 * @returns The total repayment.
 */

export function calculateTotalRepayment(
  monthlyPayment: number,
  mortgageTermInYears: number,
): number {
  return monthlyPayment * (mortgageTermInYears * 12);
}

/**
 * Calculates the capital. This is the original sum borrowed. This excludes any interest and deposit.
 * NB Capital is the same as Principal
 * Formula: C = P - D
 *
 * @param propertyPrice - The price of the property.
 * @param deposit - The deposit amount.
 * @returns The capital.
 */

export function calculateCapital(propertyPrice: number, deposit: number): number {
  return propertyPrice - deposit;
}

/**
 * Calculates the whole term interest.
 * Formula: I = T - C
 *
 * @param totalRepayment - The total repayment.
 * @param capital - The capital.
 * @returns The whole term interest.
 */

export function calculateWholeTermInterest(
  totalRepayment: number,
  capital: number,
): number {
  return totalRepayment - capital;
}

/**
 * Calculates the affordability check monthly payment
 *
 * @param propertyPrice - The price of the property.
 * @param deposit - The deposit amount.
 * @param annualInterestRate - The annual interest rate.
 * @param mortgageTermInYears - The mortgage term in years.
 * @returns The monthly mortgage payment if the interest rate were to increase by 3% in future
 */

export function calculateAffordabilityCheckMonthlyPayment(
  propertyPrice: number,
  deposit: number,
  annualInterestRate: number,
  mortgageTermInYears: number,
): number {
  return calculateMonthlyPayment(
    propertyPrice,
    deposit,
    annualInterestRate + 3,
    mortgageTermInYears,
  );
}

/**
 * Calculates the monthly mortgage payment.
 * Formula: M = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
 *
 * @param propertyPrice - The price of the property.
 * @param deposit - The deposit amount.
 * @param annualInterestRate - The annual interest rate.
 * @param mortgageTermInYears - The mortgage term in years.
 * @returns The monthly mortgage payment.
 */

export function calculateMonthlyPayment(
  propertyPrice: number,
  deposit: number,
  annualInterestRate: number,
  mortgageTermInYears: number,
): number {
  const capital = calculateCapital(propertyPrice, deposit);
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const numberOfPayments = mortgageTermInYears * 12;

  if (monthlyInterestRate === 0) {
    return capital / numberOfPayments;
  }

  const monthlyPayment =
    (capital *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  return monthlyPayment;
}

/**
 * Calculates the remaining mortgage balance at the end of each year.
 * Formula: B = P * (1 + r)^n - (M * ((1 + r)^n - 1) / r)
 * where:
 * B = Balance
 * P = Principal (loan amount) (aka Capital)
 * r = Monthly interest rate
 * n = Number of payments made
 * M = Monthly payment
 *
 * @param propertyPrice - The price of the property
 * @param deposit - The deposit amount
 * @param annualInterestRate - The annual interest rate
 * @param mortgageTermInYears - The mortgage term in years
 * @returns Array of yearly balances, where index represents the year number
 */
export function calculateYearlyBalances(
  propertyPrice: number,
  deposit: number,
  annualInterestRate: number,
  mortgageTermInYears: number,
): number[] {
  const capital = calculateCapital(propertyPrice, deposit);
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const monthlyPayment = calculateMonthlyPayment(
    propertyPrice,
    deposit,
    annualInterestRate,
    mortgageTermInYears,
  );

  // Handle 0% interest rate separately
  // In this case your monthly payment remains consistent throughout the term
  if (monthlyInterestRate === 0) {
    return Array.from({ length: mortgageTermInYears + 1 }, (_, year) => {
      const remainingPayments = (mortgageTermInYears - year) * 12;
      return remainingPayments * monthlyPayment;
    });
  }

  // Calculate balance for each year
  // This calculation uses the amortization formula for each year of the mortgage term
  // https://en.wikipedia.org/wiki/Amortization_calculator
  return Array.from({ length: mortgageTermInYears + 1 }, (_, year) => {
    const paymentsCompleted = year * 12;
    const balance =
      capital * Math.pow(1 + monthlyInterestRate, paymentsCompleted) -
      (monthlyPayment * (Math.pow(1 + monthlyInterestRate, paymentsCompleted) - 1)) /
        monthlyInterestRate;

    // Round to 0 decimal places
    return Math.round(balance * 100) / 100;
  });
}

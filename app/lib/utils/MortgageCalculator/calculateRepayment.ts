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
  const adjustedLoanAmount = propertyPrice - deposit;
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const numberOfPayments = mortgageTermInYears * 12;

  if (monthlyInterestRate === 0) {
    return adjustedLoanAmount / numberOfPayments;
  }

  const monthlyPayment =
    (adjustedLoanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  return monthlyPayment;
}

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

import {
  calculateTotalRepayment,
  calculateCapital,
  calculateWholeTermInterest,
  calculateMonthlyPayment,
  calculateYearlyBalances,
  calculateAffordabilityCheckMonthlyPayment,
} from './calculateRepayment';

describe('calculateTotalRepayment', () => {
  it('should calculate total repayment correctly', () => {
    expect(calculateTotalRepayment(1000, 25)).toBe(300000); // £1000 * 12 * 25
    expect(calculateTotalRepayment(500, 30)).toBe(180000); // £500 * 12 * 30
  });
});

describe('calculateCapital', () => {
  it('should calculate capital correctly', () => {
    expect(calculateCapital(300000, 60000)).toBe(240000);
    expect(calculateCapital(500000, 100000)).toBe(400000);
  });
});

describe('calculateWholeTermInterest', () => {
  it('should calculate whole term interest correctly', () => {
    expect(calculateWholeTermInterest(300000, 240000)).toBe(60000);
    expect(calculateWholeTermInterest(500000, 400000)).toBe(100000);
  });
});

describe('calculateMonthlyPayment', () => {
  it('should calculate monthly payment correctly with interest', () => {
    const payment = calculateMonthlyPayment(300000, 60000, 3.5, 30);
    expect(payment).toBeCloseTo(1077.71, 2);
  });

  it('should calculate monthly payment correctly with zero interest', () => {
    const payment = calculateMonthlyPayment(300000, 60000, 0, 25);
    expect(payment).toBe(800); // 240000 / (25 * 12)
  });

  it('should handle different term lengths', () => {
    const payment30Year = calculateMonthlyPayment(300000, 60000, 3.5, 30);
    const payment20Year = calculateMonthlyPayment(300000, 60000, 3.5, 20);
    expect(payment30Year).toBeLessThan(payment20Year);
  });
});

describe('calculateYearlyBalances', () => {
  it('should calculate yearly balances correctly with interest', () => {
    const balances = calculateYearlyBalances(300000, 60000, 3.5, 25);

    // Check initial balance
    expect(balances[0]).toBe(240000);

    // Check final balance is close to 0
    expect(balances[25]).toBeCloseTo(0, 0);

    // Check balance is decreasing
    expect(balances[1]).toBeLessThan(balances[0]);
    expect(balances[2]).toBeLessThan(balances[1]);
  });

  it('should calculate yearly balances correctly with zero interest', () => {
    const balances = calculateYearlyBalances(300000, 60000, 0, 25);

    // Check initial balance
    expect(balances[0]).toBe(240000);

    // Check final balance
    expect(balances[25]).toBe(0);

    // Check linear decrease
    const yearlyDecrease = 240000 / 25;
    expect(balances[1]).toBe(240000 - yearlyDecrease);
    expect(balances[2]).toBe(240000 - yearlyDecrease * 2);
  });
});

describe('calculateAffordabilityCheckMonthlyPayment', () => {
  it('should calculate affordability check payment with 3% higher rate', () => {
    const normalPayment = calculateMonthlyPayment(300000, 60000, 3.5, 25);
    const affordabilityPayment = calculateAffordabilityCheckMonthlyPayment(
      300000,
      60000,
      3.5,
      25,
    );

    expect(affordabilityPayment).toBeGreaterThan(normalPayment);

    // Verify it matches a direct calculation with +3%
    const expectedPayment = calculateMonthlyPayment(300000, 60000, 6.5, 25);
    expect(affordabilityPayment).toBe(expectedPayment);
  });
});

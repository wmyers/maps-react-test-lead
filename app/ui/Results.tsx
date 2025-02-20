import { Table } from 'react-bootstrap';
import { formatCurrency } from '../lib/utils/formatCurrency';
import { ParsedInput } from '../lib/validation/inputValues';
import {
  calculateAffordabilityCheckMonthlyPayment,
  calculateCapital,
  calculateMonthlyPayment,
  calculateTotalRepayment,
  calculateWholeTermInterest,
} from '../lib/utils/MortgageCalculator/calculateRepayment';
import React from 'react';

export default function Results({ values }: { values: ParsedInput }) {
  const { price, deposit, term, interest } = values;

  const monthlyPayment = calculateMonthlyPayment(price, deposit, interest, term);
  const totalRepayment = calculateTotalRepayment(monthlyPayment, term);
  const capital = calculateCapital(price, deposit);
  const wholeTermInterest = calculateWholeTermInterest(totalRepayment, capital);
  const affordabilityCheckMonthlyPayment = calculateAffordabilityCheckMonthlyPayment(
    price,
    deposit,
    interest,
    term,
  );

  return (
    <>
      <h2 className="pb-3">Results</h2>
      <Table striped="columns">
        <tbody>
          <tr className="border-b border-t">
            <td>Monthly Payment</td>
            <td className="text-right">{formatCurrency(monthlyPayment)}</td>
          </tr>
          <tr className="border-b">
            <td>Total Repayment</td>
            <td className="text-right">{formatCurrency(totalRepayment)}</td>
          </tr>
          <tr className="border-b">
            <td>Capital</td>
            <td className="text-right">{formatCurrency(capital)}</td>
          </tr>
          <tr className="border-b">
            <td>Interest</td>
            <td className="text-right">{formatCurrency(wholeTermInterest)}</td>
          </tr>
          <tr className="border-b">
            <td>Affordability check</td>
            <td className="text-right">
              {formatCurrency(affordabilityCheckMonthlyPayment)}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

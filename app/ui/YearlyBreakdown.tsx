import { Table } from 'react-bootstrap';
import { formatCurrency } from '../lib/utils/formatCurrency';
import { calculateYearlyBalances } from '../lib/utils/MortgageCalculator/calculateRepayment';
import { FormValues } from '../lib/definitions';

export default function YearlyBreakdown({ values }: { values: FormValues }) {
  const { price, deposit, term, interest } = values;

  const yearlyBalances = calculateYearlyBalances(price, deposit, interest, term);
  return (
    <>
      <h2 className="pb-3">Yearly Breakdown</h2>
      <Table className="max-w-52" bordered hover size="sm">
        <thead>
          <tr>
            <th>Year</th>
            <th>Remaining Debt</th>
          </tr>
        </thead>
        <tbody>
          {yearlyBalances.map((balance, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{formatCurrency(balance, 0)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

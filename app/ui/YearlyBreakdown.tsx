import { Table } from 'react-bootstrap';
import { formatCurrency } from '../lib/utils/formatCurrency';

export default function YearlyBreakdown() {
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
          <tr>
            <td>1</td>
            <td>{formatCurrency(10000)}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

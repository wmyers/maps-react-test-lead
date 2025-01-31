import { Table } from 'react-bootstrap';
import { formatCurrency } from '../lib/utils/formatCurrency';
import { ComponentProps } from '../lib/definitions';
import { validateAndParseInputValues } from '../lib/validation/inputValues';

export default function Results({ inputValues }: ComponentProps) {
  // validate search params
  const result = validateAndParseInputValues(inputValues);
  if (!result.success) {
    return (
      <div className="alert alert-danger">
        <h2>Invalid form values</h2>
        <ul>
          {result.error.issues.map((issue, index) => (
            <li key={index}>{issue.message}</li>
          ))}
        </ul>
      </div>
    );
  }

  // const { price, deposit, term, interest } = searchParams || {};

  // if no interest rate then use the boe rate

  // use search param values to calculate mortgage fields
  return (
    <>
      <h2 className="pb-3">Results</h2>
      <Table striped="columns">
        <tbody>
          <tr className="border-b border-t">
            <td>Monthly Payment</td>
            <td className="text-right">{formatCurrency(763.68)}</td>
          </tr>
          <tr className="border-b">
            <td>Total Repayment</td>
            <td className="text-right">{formatCurrency(137463.09)}</td>
          </tr>
          <tr className="border-b">
            <td>Capital</td>
            <td className="text-right">{formatCurrency(95000)}</td>
          </tr>
          <tr className="border-b">
            <td>Interest</td>
            <td className="text-right">{formatCurrency(42463.09)}</td>
          </tr>
          <tr className="border-b">
            <td>Affordability check</td>
            <td className="text-right">{formatCurrency(921.63)}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

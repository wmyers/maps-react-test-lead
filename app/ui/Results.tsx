import { Table } from "react-bootstrap";
import { formatCurrency } from "../lib/utils/formatCurrency";
import { ComponentProps } from "../lib/definitions";

export default function Results({searchParams}: ComponentProps) { 
  // validate search params, if missing search params then render message to require search params
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
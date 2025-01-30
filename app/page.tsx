
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import MortgageForm from './ui/Form';

import { formatCurrency } from './lib/utils/formatCurrency';

export default function MortgageCalculator() {
  return (
     <Container>
      <title>Mortgage Calculator Test</title>
      <Row className="gap-x-10 pt-3">
        <Col className="border-r" md="auto">
          <MortgageForm />
        </Col>
        <Col md="auto">
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
        </Col>

        <Col md="auto">
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
        </Col>
      </Row>
    </Container>
  );
}

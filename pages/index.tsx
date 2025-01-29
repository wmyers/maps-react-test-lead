import { useState, FormEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';

import { formatCurrency } from '../utils/formatCurrency';

export default function MortgageCalculator() {
  const [price, setPrice] = useState<number>(0);
  const [deposit, setDeposit] = useState<number>(0);
  const [term, setTerm] = useState<number>(15);
  const [interest, setInterest] = useState<number>(5.25);
  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalRepayment: 0,
    capital: 0,
    interest: 0,
    affordability: 0,
    yearlyBreakdown: [] as { year: number; remainingDebt: number }[],
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Add calculation logic here
    // For now, just setting dummy values
    setResults({
      monthlyPayment: 763.68,
      totalRepayment: 137463.09,
      capital: 95000,
      interest: 42463.09,
      affordability: 921.63,
      yearlyBreakdown: [{ year: 1, remainingDebt: 10000 }],
    });
  };

  return (
    <Container>
      <title>Mortgage Calculator Test</title>
      <Row className="gap-x-10 pt-3">
        <Col className="border-r" md="auto">
          <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor="price">Property Price</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>£</InputGroup.Text>
              <Form.Control
                id="price"
                name="price"
                type="number"
                className="no-spinner"
                step="any"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </InputGroup>

            <Form.Label htmlFor="deposit">Deposit</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>£</InputGroup.Text>
              <Form.Control
                id="deposit"
                name="deposit"
                type="number"
                className="no-spinner"
                step="any"
                value={deposit}
                onChange={(e) => setDeposit(Number(e.target.value))}
              />
            </InputGroup>

            <Form.Label htmlFor="term">Mortgage Term</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                id="term"
                name="term"
                type="number"
                step="any"
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
              />
              <InputGroup.Text>years</InputGroup.Text>
            </InputGroup>

            <Form.Label htmlFor="interest">Interest rate</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                id="interest"
                name="interest"
                type="number"
                step="any"
                className="no-spinner"
                value={interest}
                onChange={(e) => setInterest(Number(e.target.value))}
              />
              <InputGroup.Text>%</InputGroup.Text>
            </InputGroup>

            <Button className="w-full" variant="primary" type="submit">
              Calculate
            </Button>
          </Form>
        </Col>

        <Col md="auto">
          <h2 className="pb-3">Results</h2>
          <Table striped="columns">
            <tbody>
              <tr className="border-b border-t">
                <td>Monthly Payment</td>
                <td className="text-right">{formatCurrency(results.monthlyPayment)}</td>
              </tr>
              <tr className="border-b">
                <td>Total Repayment</td>
                <td className="text-right">{formatCurrency(results.totalRepayment)}</td>
              </tr>
              <tr className="border-b">
                <td>Capital</td>
                <td className="text-right">{formatCurrency(results.capital)}</td>
              </tr>
              <tr className="border-b">
                <td>Interest</td>
                <td className="text-right">{formatCurrency(results.interest)}</td>
              </tr>
              <tr className="border-b">
                <td>Affordability check</td>
                <td className="text-right">{formatCurrency(results.affordability)}</td>
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
              {results.yearlyBreakdown.map((breakdown) => (
                <tr key={breakdown.year}>
                  <td>{breakdown.year}</td>
                  <td>{formatCurrency(breakdown.remainingDebt)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

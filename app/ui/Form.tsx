import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import InputGroupText from 'react-bootstrap/InputGroupText';
import { ComponentProps } from '../lib/definitions';

export default function MortgageForm({ boeRate, searchParams }: ComponentProps) {
  // apply any search params to form fields
  const { price, deposit, term, interest } = searchParams || {};
  // if no interest rate then use the boe rate

  return (
    <Form>
      <Form.Label htmlFor="price">Property Price</Form.Label>
      <InputGroup className="mb-3">
        <InputGroupText>£</InputGroupText>
        <Form.Control
          id="price"
          name="price"
          type="number"
          className="no-spinner"
          step="any"
          defaultValue={price}
        />
      </InputGroup>
      <Form.Label htmlFor="deposit">Deposit</Form.Label>
      <InputGroup className="mb-3">
        <InputGroupText>£</InputGroupText>
        <Form.Control
          id="deposit"
          name="deposit"
          type="number"
          className="no-spinner"
          step="any"
          defaultValue={deposit}
        />
      </InputGroup>

      <Form.Label htmlFor="term">Mortgage Term</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          id="term"
          name="term"
          type="number"
          step="any"
          defaultValue={term || 15}
        />
        <InputGroupText>years</InputGroupText>
      </InputGroup>
      <Form.Label htmlFor="interest">Interest rate</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          id="interest"
          name="interest"
          type="number"
          step="any"
          className="no-spinner"
          defaultValue={interest || boeRate}
        />
        <InputGroupText>%</InputGroupText>
      </InputGroup>
      <Button className="w-full" variant="primary" type="submit">
        Calculate
      </Button>
    </Form>
  );
}

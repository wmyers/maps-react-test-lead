
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MortgageForm from './ui/Form';
import Results from './ui/Results';
import YearlyBreakdown from './ui/YearlyBreakdown';

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
          <Results />
        </Col>
        <Col md="auto">
          <YearlyBreakdown />  
        </Col>
      </Row>
    </Container>
  );
}

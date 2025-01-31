import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MortgageForm from './ui/Form';
import Results from './ui/Results';
import YearlyBreakdown from './ui/YearlyBreakdown';

import { FormInput } from './lib/definitions';
import { getBankRate } from './lib/data/boe';

export default async function MortgageCalculator(props: {
  searchParams?: Promise<FormInput>;
}) {
  const searchParams = await props.searchParams;
  const boeRate = await getBankRate();

  // console.log('searchParams', searchParams);

  return (
    <Container>
      <title>Mortgage Calculator Test</title>
      <Row className="gap-x-10 pt-3">
        <Col className="border-r" md="auto">
          <MortgageForm boeRate={boeRate} searchParams={searchParams} />
        </Col>
        <Col md="auto">
          <Results boeRate={boeRate} searchParams={searchParams} />
        </Col>
        <Col md="auto">
          <YearlyBreakdown />
        </Col>
      </Row>
    </Container>
  );
}

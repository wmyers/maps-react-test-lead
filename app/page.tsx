import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MortgageForm from './ui/Form';
import Results from './ui/Results';
import YearlyBreakdown from './ui/YearlyBreakdown';

import { FormInput } from './lib/definitions';
import { getBankRate } from './lib/data/boe';
import { validateAndParseInput } from './lib/validation/inputValues';

export default async function MortgageCalculator(props: {
  searchParams?: Promise<FormInput>;
}) {
  const searchParams = await props.searchParams;
  const boeRate = await getBankRate();

  // string inputs from search params
  const input: FormInput = {
    // default price to £100,000 if nullish search param
    price: searchParams?.price ?? '100000',
    // default deposit to £5,000 if nullish search param
    // NB this param is still optionally defaulting to 0 when parsed by zod
    deposit: searchParams?.deposit ?? '5000',
    // default term to 15 years if nullish search param
    term: searchParams?.term ?? '15',
    // always use boe rate as default
    interest: searchParams?.interest || boeRate.toString(),
  };

  return (
    <Container>
      <title>Mortgage Calculator Test</title>
      <Row className="gap-x-10 pt-3">
        <Col className="border-r" md="auto">
          <MortgageForm input={input} />
        </Col>
        {<Calculations input={input} />}
      </Row>
    </Container>
  );
}

export function Calculations({ input }: { input: FormInput }) {
  const result = validateAndParseInput(input);
  if (result.error) {
    return (
      <Col md="auto" className="alert alert-danger">
        <h2>Invalid form values</h2>
        <ul>
          {result.error.issues.map((issue, index) => (
            <li key={index}>{issue.message}</li>
          ))}
        </ul>
      </Col>
    );
  }
  return (
    <>
      <Col md="auto">
        <Results values={result.data} />
      </Col>
      <Col md="auto">
        <YearlyBreakdown values={result.data} />
      </Col>
    </>
  );
}

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MortgageForm from './ui/Form';
import Results from './ui/Results';
import YearlyBreakdown from './ui/YearlyBreakdown';

import { SearchParams, FormInput } from './lib/definitions';

import { validateAndParseInput } from './lib/validation/inputValues';
import { getInput } from './ui/getInput';

export default async function MortgageCalculatorUI(props: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;
  const input = await getInput(searchParams);

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

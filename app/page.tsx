import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MortgageForm from './ui/Form';
import Results from './ui/Results';
import YearlyBreakdown from './ui/YearlyBreakdown';

import { FormInput } from './lib/definitions';
import { getBankRate } from './lib/data/boe';
import { validateAndParseInputValues } from './lib/validation/inputValues';

export default async function MortgageCalculator(props: {
  searchParams?: Promise<FormInput>;
}) {
  const searchParams = await props.searchParams;
  const boeRate = await getBankRate();

  // console.log('searchParams', searchParams);

  const values: FormInput = {
    price: searchParams?.price ?? '200000', // default to £200,000 if nullish search param
    deposit: searchParams?.deposit ?? '10000', // default to £10,000 if nullish search param
    term: searchParams?.term ?? '25', // default to 25 years if nullish search param
    interest: searchParams?.interest || boeRate.toString(), // always use boe rate as default
  };

  // validate input values
  const { error, success } = validateAndParseInputValues(values);

  return (
    <Container>
      <title>Mortgage Calculator Test</title>
      <Row className="gap-x-10 pt-3">
        <Col className="border-r" md="auto">
          <MortgageForm boeRate={boeRate} inputValues={values} />
        </Col>
        {error && (
          <Col md="auto" className="alert alert-danger">
            <h2>Invalid form values</h2>
            <ul>
              {error.issues.map((issue, index) => (
                <li key={index}>{issue.message}</li>
              ))}
            </ul>
          </Col>
        )}
        {success && (
          <>
            <Col md="auto">
              <Results boeRate={boeRate} inputValues={values} />
            </Col>
            <Col md="auto">
              <YearlyBreakdown />
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}

import Results from './Results';
import YearlyBreakdown from './YearlyBreakdown';
import { validateAndParseInput } from '../lib/validation/inputValues';
import { FormInput } from '../lib/definitions';
import React from 'react';
import { Col } from 'react-bootstrap';

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

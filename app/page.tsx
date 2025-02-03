import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MortgageForm from './ui/Form';

import { SearchParams } from './lib/definitions';

import { getInput } from './ui/getInput';
import React from 'react';
import { Calculations } from './ui/Calculations';

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

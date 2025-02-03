/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Calculations } from './Calculations';
import MortgageForm from './Form';
import Results from './Results';
import YearlyBreakdown from './YearlyBreakdown';
import { FormInput } from '../lib/definitions';
import React from 'react';

const mockInput: FormInput = {
  price: '300000',
  deposit: '60000',
  term: '25',
  interest: '3.5',
};

describe('MortgageForm', () => {
  it('renders form with input values in number type fields', () => {
    render(<MortgageForm input={mockInput} />);

    expect(screen.getByLabelText(/property price/i)).toHaveValue(300000);
    expect(screen.getByLabelText(/deposit/i)).toHaveValue(60000);
    expect(screen.getByLabelText(/term/i)).toHaveValue(25);
    expect(screen.getByLabelText(/interest rate/i)).toHaveValue(3.5);
  });
});

describe('Calculations', () => {
  it('shows validation errors for invalid inputs', () => {
    const invalidInput: FormInput = {
      price: '-100',
      deposit: '1000000',
      term: '1',
      interest: '20',
    };

    render(<Calculations input={invalidInput} />);

    expect(
      screen.getByText(/property price must be greater than 0/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/minimum term is 2 years/i)).toBeInTheDocument();
  });
});

describe('Results', () => {
  it('renders mortgage calculation results', () => {
    const validValues = {
      price: 300000,
      deposit: 60000,
      term: 25,
      interest: 3.5,
    };

    render(<Results values={validValues} />);

    expect(screen.getByText(/monthly payment/i)).toBeInTheDocument();
    expect(screen.getByText(/total repayment/i)).toBeInTheDocument();
    expect(screen.getByText(/capital/i)).toBeInTheDocument();
    expect(screen.getByText(/interest/i)).toBeInTheDocument();
  });
});

describe('YearlyBreakdown', () => {
  it('renders yearly balance breakdown', () => {
    const validValues = {
      price: 300000,
      deposit: 60000,
      term: 25,
      interest: 3.5,
    };

    render(<YearlyBreakdown values={validValues} />);

    expect(screen.getByText(/^14$/i)).toBeInTheDocument();
    expect(screen.getByText(/^15$/i)).toBeInTheDocument();
    expect(screen.getByText(/^22$/i)).toBeInTheDocument();
    expect(screen.getByText(/^25$/i)).toBeInTheDocument();
    expect(screen.getByText(/remaining debt/i)).toBeInTheDocument();
  });
});

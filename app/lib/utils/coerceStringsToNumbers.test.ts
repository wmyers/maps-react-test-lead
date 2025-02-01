import coerceStringsToNumbers from './coerceStringsToNumbers';

describe('coerceStringsToNumbers', () => {
  it('should convert string numbers to numbers', () => {
    const input = {
      price: '300000',
      deposit: '60000',
      term: '25',
    };

    const result = coerceStringsToNumbers(input);

    expect(result).toEqual({
      price: 300000,
      deposit: 60000,
      term: 25,
    });
  });

  it('should handle decimal numbers', () => {
    const input = {
      interest: '3.5',
      ratio: '0.8',
    };

    const result = coerceStringsToNumbers(input);

    expect(result).toEqual({
      interest: 3.5,
      ratio: 0.8,
    });
  });

  it('should throw error for non-numeric strings', () => {
    const input = {
      price: 'not-a-number',
      deposit: '60000',
    };

    expect(() => coerceStringsToNumbers(input)).toThrow(
      'Invalid string values to coerce to numbers in coerceStringsToNumbers',
    );
  });

  it('should throw error for empty strings', () => {
    const input = {
      price: '',
      deposit: '60000',
    };

    expect(() => coerceStringsToNumbers(input)).toThrow(
      'Invalid string values to coerce to numbers in coerceStringsToNumbers',
    );
  });

  it('should throw error for empty object', () => {
    const input = {};

    expect(() => coerceStringsToNumbers(input)).toThrow(
      'Invalid string values to coerce to numbers in coerceStringsToNumbers',
    );
  });

  it('should throw error if any value is NaN', () => {
    const input = {
      price: 'NaN',
      deposit: '60000',
    };

    expect(() => coerceStringsToNumbers(input)).toThrow(
      'Invalid string values to coerce to numbers in coerceStringsToNumbers',
    );
  });
});

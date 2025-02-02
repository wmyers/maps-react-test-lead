import coerceInputStringsToNumericValues, {
  isFormInputKey,
} from './coerceStringsToNumbers';

describe('isFormInputKey', () => {
  it('should return true for valid FormInput keys', () => {
    expect(isFormInputKey('price')).toBe(true);
    expect(isFormInputKey('deposit')).toBe(true);
    expect(isFormInputKey('term')).toBe(true);
    expect(isFormInputKey('interest')).toBe(true);
  });

  it('should return false for invalid keys', () => {
    expect(isFormInputKey('invalid')).toBe(false);
    expect(isFormInputKey('')).toBe(false);
    expect(isFormInputKey('Price')).toBe(false); // case sensitive
  });
});

describe('coerceInputStringsToNumericValues', () => {
  it('should convert valid string inputs to numbers', () => {
    const input = {
      price: '300000',
      deposit: '60000',
      term: '25',
      interest: '3.5',
    };

    const expected = {
      price: 300000,
      deposit: 60000,
      term: 25,
      interest: 3.5,
    };

    expect(coerceInputStringsToNumericValues(input)).toEqual(expected);
  });

  it('should handle partial inputs', () => {
    const input = {
      price: '300000',
      deposit: '60000',
      term: '25',
    };

    const expected = {
      price: 300000,
      deposit: 60000,
      term: 25,
    };

    expect(coerceInputStringsToNumericValues(input)).toEqual(expected);
  });

  it('should throw error for invalid numeric strings', () => {
    const input = {
      price: 'not-a-number',
      deposit: '60000',
      term: '25',
    };

    expect(() => coerceInputStringsToNumericValues(input)).toThrow();
  });

  it('should throw error for empty strings', () => {
    const input = {
      price: '',
      deposit: '60000',
      term: '25',
    };

    expect(() => coerceInputStringsToNumericValues(input)).toThrow();
  });

  it('should throw error for NaN values', () => {
    const input = {
      price: 'NaN',
      deposit: '60000',
      term: '25',
    };

    expect(() => coerceInputStringsToNumericValues(input)).toThrow();
  });

  it('should ignore additional properties', () => {
    const input = {
      price: '300000',
      deposit: '60000',
      term: '25',
      extraProperty: 'should be ignored',
    };

    const expected = {
      price: 300000,
      deposit: 60000,
      term: 25,
    };

    expect(coerceInputStringsToNumericValues(input)).toEqual(expected);
  });

  it('should throw error for empty input object', () => {
    const input = {};

    expect(() => coerceInputStringsToNumericValues(input)).toThrow();
  });
});
